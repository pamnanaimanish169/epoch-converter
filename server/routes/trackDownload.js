import { sanityClient } from '../lib/sanity.js';
import { validateDownloadToken } from '../lib/token.js';

/**
 * POST /api/track-download
 * Tracks a file download and updates the download count
 */
export async function trackDownloadHandler(req, res) {
  try {
    const { email, freebieId, downloadSource = 'direct', token } = req.body;
    console.log('trackDownloadHandler called', email, freebieId, downloadSource, token);
    // console.log('req.body', req.body);

    // Validate required fields
    if (!freebieId) {
      return res.status(400).json({
        success: false,
        error: 'Freebie ID is required'
      });
    }

    // Email is optional for anonymous downloads, but required for email downloads
    let normalizedEmail = null;
    if (email) {
      // Validate email format if provided
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({
          success: false,
          error: 'Invalid email format'
        });
      }
      normalizedEmail = email.toLowerCase().trim();
      
      // Skip tracking for placeholder anonymous emails
      if (normalizedEmail === 'anonymous@example.com') {
        return res.json({
          success: true,
          message: 'Anonymous download (not tracked)'
        });
      }

      // Validate token if provided (for email downloads)
      if (token && !validateDownloadToken(token, normalizedEmail, freebieId)) {
        return res.status(401).json({
          success: false,
          error: 'Invalid or expired download token'
        });
      }
    }

    // Get client IP and user agent
    const forwardedFor = req.headers['x-forwarded-for'];
    const ipAddress = forwardedFor 
      ? forwardedFor.split(',')[0].trim() 
      : req.ip || req.connection?.remoteAddress || req.socket?.remoteAddress;
    const userAgent = req.headers['user-agent'] || '';

    // Find the freebie by slug
    const freebieQuery = `*[_type == "freebie" && slug.current == $freebieId][0] {
      _id,
      title,
      downloadCount
    }`;

    const freebie = await sanityClient.fetch(freebieQuery, { freebieId });

    if (!freebie) {
      return res.status(404).json({
        success: false,
        error: 'Freebie not found'
      });
    }

    // Only create download log if email is provided (skip anonymous downloads)
    let logDocument = null;
    if (normalizedEmail) {
      // Create download log entry
      const downloadLog = {
        _type: 'downloadLog',
        freebie: {
          _type: 'reference',
          _ref: freebie._id,
        },
        email: normalizedEmail,
        downloadedAt: new Date().toISOString(),
        downloadSource,
        userAgent: userAgent.substring(0, 500), // Limit length
        ipAddress: ipAddress || undefined,
      };

      // Create the download log document
      logDocument = await sanityClient.create(downloadLog);
    }

    // Increment download count atomically
    const newDownloadCount = (freebie.downloadCount || 0) + 1;
    
    await sanityClient
      .patch(freebie._id)
      .set({ downloadCount: newDownloadCount })
      .commit();

    console.log('Download tracked:', {
      email: normalizedEmail || 'anonymous',
      freebieId,
      downloadSource,
      downloadCount: newDownloadCount,
      logId: logDocument?._id || 'not logged'
    });

    // Return success response
    res.json({
      success: true,
      downloadCount: newDownloadCount,
      message: 'Download tracked successfully'
    });
  } catch (error) {
    console.error('Error tracking download:', error);

    // Handle Sanity API errors
    if (error.response) {
      const statusCode = error.response.statusCode || error.response.status || 500;
      let errorMessage = error.response.body?.message || error.message || 'Failed to track download';
      
      // Provide helpful error message for permission errors
      if (errorMessage.includes('permission') || errorMessage.includes('Insufficient permissions')) {
        errorMessage = 'Sanity API permission error: The API token does not have write permissions. ' +
          'Please ensure VITE_SANITY_WRITE_API_TOKEN is set in your .env file with a token that has "Editor" permissions. ' +
          'Get your token from: https://www.sanity.io/manage → Your Project → API → Tokens';
        console.error('⚠️  Permission error detected. Check your VITE_SANITY_WRITE_API_TOKEN configuration.');
      }
      
      return res.status(statusCode < 500 ? statusCode : 500).json({
        success: false,
        error: errorMessage
      });
    }

    // Check if error message indicates missing token
    if (error.message && (error.message.includes('permission') || error.message.includes('Insufficient permissions'))) {
      const helpfulMessage = 'Sanity API permission error: The API token does not have write permissions. ' +
        'Please ensure VITE_SANITY_WRITE_API_TOKEN is set in your .env file with a token that has "Editor" permissions. ' +
        'Get your token from: https://www.sanity.io/manage → Your Project → API → Tokens';
      
      return res.status(403).json({
        success: false,
        error: helpfulMessage
      });
    }

    // Handle other errors
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to track download'
    });
  }
}

