import { sanityClient } from '../lib/sanity.js';

/**
 * GET /api/download-emails/:freebieId
 * Returns emails for a specific freebie
 */
export async function getDownloadEmailsHandler(req, res) {
  try {
    const { freebieId } = req.params;
    const { unique, count, format } = req.query;

    // Validate freebieId
    if (!freebieId) {
      return res.status(400).json({
        success: false,
        error: 'Freebie ID is required'
      });
    }

    // First, find the freebie by slug to get its _id
    const freebieQuery = `*[_type == "freebie" && slug.current == $freebieId][0] {
      _id,
      title,
      slug
    }`;

    const freebie = await sanityClient.fetch(freebieQuery, { freebieId });

    if (!freebie) {
      return res.status(404).json({
        success: false,
        error: 'Freebie not found'
      });
    }

    // Query download logs for this freebie
    const downloadLogsQuery = `*[_type == "downloadLog" && references($freebieId)] | order(downloadedAt desc) {
      email,
      downloadedAt,
      downloadSource
    }`;

    const downloadLogs = await sanityClient.fetch(downloadLogsQuery, { 
      freebieId: freebie._id 
    });

    // If simple format requested, return just email strings
    if (format === 'simple') {
      const emails = downloadLogs.map(log => log.email);
      const uniqueEmails = unique === 'true' 
        ? [...new Set(emails)]
        : emails;

      return res.json({
        success: true,
        freebieId,
        emails: uniqueEmails
      });
    }

    // Process download logs to aggregate by email
    const emailMap = new Map();

    downloadLogs.forEach(log => {
      const email = log.email.toLowerCase().trim();
      
      if (!emailMap.has(email)) {
        emailMap.set(email, {
          email,
          downloadCount: 0,
          firstDownloaded: log.downloadedAt,
          lastDownloaded: log.downloadedAt,
          downloads: []
        });
      }

      const emailData = emailMap.get(email);
      emailData.downloadCount += 1;
      
      // Update timestamps
      const downloadDate = new Date(log.downloadedAt);
      const firstDate = new Date(emailData.firstDownloaded);
      const lastDate = new Date(emailData.lastDownloaded);

      if (downloadDate < firstDate) {
        emailData.firstDownloaded = log.downloadedAt;
      }
      if (downloadDate > lastDate) {
        emailData.lastDownloaded = log.downloadedAt;
      }

      // Store individual download record if count is requested
      if (count === 'true') {
        emailData.downloads.push({
          downloadedAt: log.downloadedAt,
          downloadSource: log.downloadSource
        });
      }
    });

    // Convert map to array
    let emails = Array.from(emailMap.values());

    // If unique is requested, we already deduplicated, but sort by email
    if (unique === 'true') {
      emails = emails.sort((a, b) => a.email.localeCompare(b.email));
    } else {
      // Sort by last downloaded (newest first)
      emails = emails.sort((a, b) => 
        new Date(b.lastDownloaded) - new Date(a.lastDownloaded)
      );
    }

    // Remove downloads array if count is not requested
    if (count !== 'true') {
      emails = emails.map(({ downloads, ...rest }) => rest);
    }

    // Calculate totals
    const totalDownloads = downloadLogs.length;
    const uniqueEmails = emailMap.size;

    // Return response
    res.json({
      success: true,
      freebieId,
      totalDownloads,
      uniqueEmails,
      emails
    });

  } catch (error) {
    console.error('Error fetching download emails:', error);

    // Handle Sanity API errors
    if (error.response) {
      const statusCode = error.response.statusCode || error.response.status || 500;
      const errorMessage = error.response.body?.message || error.message || 'Failed to fetch download emails';
      
      return res.status(statusCode < 500 ? statusCode : 500).json({
        success: false,
        error: errorMessage
      });
    }

    // Handle other errors
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to fetch download emails'
    });
  }
}

