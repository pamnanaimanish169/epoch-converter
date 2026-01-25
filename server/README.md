# API Server Setup

This directory contains the Node.js Express server for handling email subscriptions via Brevo.

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Server Configuration
PORT=3001

# Brevo (formerly Sendinblue) Configuration
# Get your API key from: https://app.brevo.com/settings/keys/api
BREVO_API_KEY=your_brevo_api_key_here

# Sender email address (must be verified in Brevo)
BREVO_SENDER_EMAIL=noreply@yourdomain.com

# Sender name (optional)
BREVO_SENDER_NAME=Epoch Converter

# Brevo Template ID
# Create a template in Brevo and use its ID here
# Find it in: Brevo Dashboard > Campaigns > Email Templates
BREVO_TEMPLATE_ID=1

# Base URL for download links and unsubscribe links
BASE_URL=https://epoch-tools.com
```

### 3. Get Your Brevo API Key

1. Sign up or log in to [Brevo](https://www.brevo.com/)
2. Go to **Settings** → **API Keys**
3. Create a new API key or use an existing one
4. Copy the API key to your `.env` file

### 4. Create Email Template in Brevo

1. Go to **Campaigns** → **Email Templates** in Brevo
2. Create a new template or use the provided template from `brevo-email-template.html`
3. Use the following variables in your template:
   - `{{params.freebieTitle}}` - The title of the freebie
   - `{{params.downloadLink}}` - The download URL
   - `{{params.userEmail}}` - The user's email address
   - `{{params.currentYear}}` - Current year
   - `{{params.unsubscribeLink}}` - Unsubscribe link
4. Note the Template ID and add it to your `.env` file

### 5. Verify Sender Email

Make sure the email address in `BREVO_SENDER_EMAIL` is verified in your Brevo account:
1. Go to **Settings** → **Senders**
2. Add and verify your sender email address

## Running the Server

### Development Mode (with auto-reload)

```bash
npm run dev:server
```

### Production Mode

```bash
npm run server
```

The server will start on `http://localhost:3001` (or the port specified in your `.env` file).

## API Endpoint

### POST /api/subscribe

Subscribe a user to receive a freebie download link via email.

**Request Body:**
```json
{
  "email": "user@example.com",
  "freebieId": "email-template-collection",
  "freebieTitle": "Email Template Collection - 20 Responsive Templates"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Email sent successfully"
}
```

**Error Response (400/500):**
```json
{
  "success": false,
  "error": "Error message"
}
```

## Frontend Configuration

Update your frontend `.env` or `vite.config.ts` to point to the API:

```env
VITE_API_URL=http://localhost:3001
```

Or in production:
```env
VITE_API_URL=https://api.yourdomain.com
```

## Testing

You can test the API endpoint using curl:

```bash
curl -X POST http://localhost:3001/api/subscribe \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "freebieId": "email-template-collection",
    "freebieTitle": "Email Template Collection"
  }'
```

## Troubleshooting

### Email not sending

1. Check that `BREVO_API_KEY` is correct
2. Verify the sender email is verified in Brevo
3. Ensure the template ID exists and is correct
4. Check server logs for detailed error messages

### CORS errors

The server is configured to allow CORS from all origins. For production, you may want to restrict this in `server/index.js`.

### Port already in use

Change the `PORT` in your `.env` file to use a different port.

