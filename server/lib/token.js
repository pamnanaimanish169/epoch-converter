import crypto from 'crypto';

// Secret key for token generation (should be in environment variables)
const TOKEN_SECRET = process.env.DOWNLOAD_TOKEN_SECRET || 'your-secret-key-change-in-production';
const TOKEN_EXPIRY_HOURS = 24 * 30; // 30 days default

/**
 * Generate a secure download token
 * @param {string} email - User email
 * @param {string} freebieId - Freebie ID (slug)
 * @returns {string} - Secure token
 */
export function generateDownloadToken(email, freebieId) {
  const timestamp = Date.now();
  const data = `${email}:${freebieId}:${timestamp}`;
  const hmac = crypto.createHmac('sha256', TOKEN_SECRET);
  hmac.update(data);
  const token = hmac.digest('hex');
  
  // Return token with timestamp for expiration checking
  return `${token}:${timestamp}`;
}

/**
 * Validate a download token
 * @param {string} token - Token to validate
 * @param {string} email - User email
 * @param {string} freebieId - Freebie ID (slug)
 * @returns {boolean} - True if token is valid
 */
export function validateDownloadToken(token, email, freebieId) {
  try {
    const [tokenHash, timestamp] = token.split(':');
    
    if (!tokenHash || !timestamp) {
      return false;
    }
    
    // Check expiration (30 days)
    const tokenAge = Date.now() - parseInt(timestamp, 10);
    const maxAge = TOKEN_EXPIRY_HOURS * 60 * 60 * 1000;
    
    if (tokenAge > maxAge) {
      return false; // Token expired
    }
    
    // Verify token
    const data = `${email}:${freebieId}:${timestamp}`;
    const hmac = crypto.createHmac('sha256', TOKEN_SECRET);
    hmac.update(data);
    const expectedHash = hmac.digest('hex');
    
    return crypto.timingSafeEqual(
      Buffer.from(tokenHash),
      Buffer.from(expectedHash)
    );
  } catch (error) {
    console.error('Token validation error:', error);
    return false;
  }
}

