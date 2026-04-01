# Fix: Sanity CORS Error

## Problem

Error: `CORS error` when trying to fetch data from Sanity API.

This happens because Sanity requires your frontend domain to be added to the allowed CORS origins.

## Solution: Add CORS Origin in Sanity Dashboard

### Step 1: Go to Sanity Dashboard

1. Visit: https://www.sanity.io/manage
2. Log in to your account
3. Select your project (Project ID: `9bvn6eic`)

### Step 2: Navigate to API Settings

1. In your project dashboard, go to **API** section
2. Or go directly to: https://www.sanity.io/manage/personal/project/9bvn6eic/api
3. Look for **"CORS origins"** or **"Allowed origins"** section

### Step 3: Add Your Frontend Domain

Add your production frontend domain(s):

**For production:**
```
https://yourdomain.com
https://www.yourdomain.com
```

**Examples:**
- `https://epoch-tools.com`
- `https://www.epoch-tools.com`

**Important:**
- Include both `www` and non-`www` versions if you use both
- Include protocol (`https://`)
- No trailing slash
- Add each domain separately

### Step 4: Save Changes

1. Click **"Add"** or **"Save"**
2. Changes take effect immediately (no deployment needed)

## Alternative: Using Sanity CLI

If you prefer command line:

```bash
# Install Sanity CLI (if not already installed)
npm install -g @sanity/cli

# Login to Sanity
sanity login

# Add CORS origin
sanity cors add https://yourdomain.com
```

## For Development (Localhost)

If you're also testing locally, add:

```
http://localhost:5173
http://localhost:3000
http://127.0.0.1:5173
```

(Use the port your Vite dev server runs on)

## Verify Fix

After adding CORS origins:

1. **Wait 1-2 minutes** for changes to propagate
2. **Clear browser cache** (Ctrl+Shift+R)
3. **Reload your site**
4. **Check Network tab** - CORS error should be gone
5. **Test freebies page** - should load data

## Common CORS Origins to Add

Based on your setup, add these:

```
# Production
https://yourdomain.com
https://www.yourdomain.com

# Development (optional)
http://localhost:5173
http://localhost:3000
```

## Troubleshooting

### Still Getting CORS Error?

1. **Verify domain is correct:**
   - Check exact URL in browser address bar
   - Must match exactly (including `www` or not)
   - Must include `https://`

2. **Check for typos:**
   - No trailing slashes
   - Correct protocol (`https://` not `http://`)
   - No extra spaces

3. **Wait for propagation:**
   - Changes can take 1-2 minutes
   - Try again after waiting

4. **Check browser console:**
   - Look for exact error message
   - Verify which domain is being blocked

### Multiple Domains

If you have multiple domains/subdomains:
- Add each one separately
- Or use wildcard (if supported): `https://*.yourdomain.com`

### Sanity CDN vs API

- **CDN requests** (images) don't need CORS
- **API requests** (GROQ queries) need CORS
- Make sure you're adding origins for API, not just CDN

## Quick Checklist

- [ ] Logged into Sanity dashboard
- [ ] Navigated to API → CORS origins
- [ ] Added production domain: `https://yourdomain.com`
- [ ] Added www version if needed: `https://www.yourdomain.com`
- [ ] Saved changes
- [ ] Waited 1-2 minutes
- [ ] Cleared browser cache
- [ ] Tested site - CORS error gone

## Still Having Issues?

If CORS error persists after adding origins:

1. **Double-check domain:**
   - Open your site
   - Copy exact URL from address bar
   - Add that exact URL to Sanity

2. **Check Sanity project:**
   - Verify you're editing the correct project
   - Project ID should be `9bvn6eic`

3. **Contact Sanity support:**
   - If origins are added but still blocked
   - They can check server-side configuration

## Additional Notes

- CORS origins are **project-specific**
- Each project needs its own CORS configuration
- Changes are **immediate** (no deployment)
- You can add multiple origins
- Remove old/unused origins for security





