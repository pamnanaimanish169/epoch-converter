# Production Considerations & Solutions

This document covers important production considerations for the freebies section.

## 1. Bypassing Render Cold Start (15-minute inactivity)

Render's free tier services spin down after 15 minutes of inactivity, causing a cold start delay (5-30 seconds) on the first request after spin-down.

### Solution Options

#### Option A: External Ping Service (Recommended for Free Tier)

Use a free uptime monitoring service to ping your health endpoint every 10-14 minutes:

**Recommended Services:**
1. **UptimeRobot** (https://uptimerobot.com)
   - Free tier: 50 monitors, 5-minute intervals
   - Setup:
     - Create account
     - Add new monitor
     - Type: HTTP(s)
     - URL: `https://your-service.onrender.com/health`
     - Interval: 5 minutes
     - Status: Active

2. **cron-job.org** (https://cron-job.org)
   - Free tier: Unlimited jobs
   - Setup:
     - Create account
     - Create new cron job
     - URL: `https://your-service.onrender.com/health`
     - Schedule: Every 10 minutes (`*/10 * * * *`)
     - Method: GET

3. **Pingdom** (https://www.pingdom.com)
   - Free tier available
   - Similar setup to UptimeRobot

4. **Better Uptime** (https://betteruptime.com)
   - Free tier: 10 monitors, 1-minute intervals
   - Good for keeping services warm

**Implementation:**
- Set ping interval to 10-14 minutes (less than 15-minute timeout)
- Ping the `/health` endpoint (lightweight, doesn't trigger heavy operations)
- This keeps the service "warm" and prevents spin-down

#### Option B: Upgrade to Paid Tier

Render paid tiers ($7/month Starter plan):
- Services stay active 24/7
- No cold starts
- Better performance
- More reliable for production

**When to upgrade:**
- If you have regular traffic (multiple requests per hour)
- If cold starts are affecting user experience
- If you need guaranteed uptime

#### Option C: Self-Hosted Cron Job

If you have a VPS or another always-on server:
- Set up a cron job to ping every 10 minutes
- Use `curl` or `wget`:
  ```bash
  */10 * * * * curl -s https://your-service.onrender.com/health > /dev/null
  ```

#### Option D: Render Scheduled Jobs (Paid Feature)

Render offers scheduled jobs on paid plans:
- Can trigger a lightweight endpoint periodically
- More integrated solution

### Recommended Approach

**For Free Tier:** Use UptimeRobot or cron-job.org with 10-minute intervals
**For Production:** Upgrade to Render Starter plan ($7/month)

### Monitoring Cold Starts

You can detect cold starts by:
- Monitoring response times (cold starts = 5-30s first request)
- Checking Render logs for "Starting service" messages
- Using APM tools to track latency spikes

---

## 2. Hiding/Obfuscating Freebie Download URLs

Currently, download URLs are exposed in:
- Frontend API responses (Sanity queries return `downloadFile` and `downloadUrl`)
- Browser network tab (visible in API calls)
- Frontend code (accessible via browser DevTools)

### Security Concerns

1. **Direct Access**: Users can bypass email capture and access files directly
2. **Hotlinking**: URLs can be shared/distributed without tracking
3. **Bandwidth Abuse**: Direct links can be abused for unauthorized downloads
4. **Analytics Loss**: No tracking of who downloads what

### Solution Strategies

#### Strategy A: Server-Side Proxy (Recommended)

**Concept:**
- Never expose direct download URLs to frontend
- Frontend requests download through your API
- Server validates request (email, token, etc.)
- Server proxies the file download

**Implementation Approach:**
1. Remove `downloadFile` and `downloadUrl` from frontend queries
2. Create new API endpoint: `GET /api/download/:slug`
3. Endpoint validates:
   - Email (from session/token)
   - Download token (from email link)
   - Rate limiting
4. Server fetches file from Sanity/external source
5. Server streams file to user
6. Track download before serving

**Benefits:**
- Complete control over access
- Full download tracking
- Can add rate limiting
- Can add authentication
- URLs never exposed

**Trade-offs:**
- Server bandwidth usage
- Slightly slower downloads (proxy overhead)
- More server-side code

#### Strategy B: Signed/Temporary URLs

**Concept:**
- Generate time-limited, signed URLs server-side
- URLs expire after set time (e.g., 1 hour)
- URLs are single-use or limited-use
- Frontend never sees permanent URLs

**Implementation Approach:**
1. Frontend requests download: `POST /api/request-download/:slug`
2. Server validates email/token
3. Server generates signed URL with:
   - Expiration timestamp
   - User email hash
   - Freebie ID
   - HMAC signature
4. Server returns temporary URL (valid for 1 hour)
5. Frontend uses temporary URL for download
6. Server validates signature on download request

**Benefits:**
- URLs expire automatically
- Can revoke access
- Better than exposing permanent URLs
- Still allows direct downloads (faster)

**Trade-offs:**
- More complex implementation
- Need URL signing/validation logic
- URLs still visible in network tab (but expire)

#### Strategy C: Obfuscation + Token Validation

**Concept:**
- Keep current flow but add server-side validation
- Obfuscate URLs in frontend (encode/encrypt)
- Require valid token for download
- Server validates before allowing download

**Implementation Approach:**
1. Server returns obfuscated URL (base64 encoded or encrypted)
2. Frontend decodes URL only when needed
3. Download endpoint validates token before redirecting
4. Track download on validation

**Benefits:**
- Minimal code changes
- URLs not easily copyable
- Still uses direct downloads (fast)

**Trade-offs:**
- Obfuscation is not true security
- Determined users can still extract URLs
- Less secure than proxy approach

#### Strategy D: Email-Only Downloads

**Concept:**
- Remove all download URLs from frontend
- Downloads ONLY available via email link
- Email links contain signed tokens
- No direct access from frontend

**Implementation Approach:**
1. Remove `downloadFile`/`downloadUrl` from frontend queries
2. Frontend only shows "Get via Email" button
3. User must provide email to receive download link
4. Email contains signed, time-limited download URL
5. No way to download without email

**Benefits:**
- Maximum security
- Guaranteed email capture
- Full download tracking
- Prevents unauthorized access

**Trade-offs:**
- Users must wait for email
- Extra step in user flow
- Email delivery dependency

### Recommended Approach

**For Maximum Security:** Strategy A (Server-Side Proxy)
- Complete control
- Full tracking
- Best user experience (no email wait)

**For Balanced Approach:** Strategy B (Signed URLs)
- Good security
- Fast downloads
- Time-limited access

**For Quick Implementation:** Strategy C (Obfuscation)
- Minimal changes
- Better than current state
- Still allows direct downloads

### Current State Analysis

**What's Exposed:**
- ✅ Download URLs in Sanity API responses
- ✅ URLs visible in browser DevTools
- ✅ URLs in network requests
- ✅ URLs can be extracted from frontend code

**What's Protected:**
- ✅ Email capture required for email-based downloads
- ✅ Download tracking via tokens
- ✅ Token validation on download endpoint

**Gap:**
- ❌ Direct URLs accessible without email
- ❌ URLs can be shared/distributed
- ❌ No rate limiting on direct access

### Implementation Priority

1. **Immediate (Quick Win):** Remove `downloadFile` and `downloadUrl` from listing/search queries (only include in detail page after email capture)
2. **Short-term:** Implement server-side proxy endpoint
3. **Long-term:** Add rate limiting and access controls

### Code Changes Required (Future)

When ready to implement, you'll need to:

1. **Modify GROQ Queries:**
   - Remove `downloadFile` and `downloadUrl` from `FREEBIES_QUERY`
   - Remove from `SEARCH_FREEBIES_QUERY`
   - Keep only in `FREEBIE_BY_SLUG_QUERY` (for authenticated requests)

2. **Create Proxy Endpoint:**
   - `GET /api/download/:slug`
   - Validates email/token
   - Fetches file from Sanity
   - Streams to user
   - Tracks download

3. **Update Frontend:**
   - Remove direct download URLs from listing
   - Use proxy endpoint for downloads
   - Handle download errors gracefully

---

## Summary

### Cold Start Solution
- **Free Tier:** Use UptimeRobot/cron-job.org (10-minute pings)
- **Production:** Upgrade to Render Starter ($7/month)

### Download URL Security
- **Current:** URLs exposed in frontend
- **Recommended:** Server-side proxy (Strategy A)
- **Quick Win:** Remove URLs from listing queries

### Next Steps
1. Set up ping service for cold start prevention
2. Plan download URL security implementation
3. Consider upgrading to paid tier for production

