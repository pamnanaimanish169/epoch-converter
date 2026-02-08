import { createClient } from '@sanity/client';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Get the directory of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables from the project root
dotenv.config({ path: join(__dirname, '..', '..', '.env') });

// Sanity client for server-side operations
// This client needs write permissions to create download logs and update freebie counts
const writeToken = process.env.VITE_SANITY_WRITE_API_TOKEN;

// Validate that we have a write token
if (!writeToken) {
  console.error('⚠️  WARNING: VITE_SANITY_WRITE_API_TOKEN or VITE_SANITY_API_TOKEN is not set!');
  console.error('   Download tracking will fail. Please add a write token to your .env file.');
  console.error('   Get your token from: https://www.sanity.io/manage → Your Project → API → Tokens');
  console.error('   Create a token with "Editor" permissions (not just "Viewer")');
}

export const sanityClient = createClient({
  projectId: process.env.VITE_SANITY_PROJECT_ID || process.env.SANITY_STUDIO_PROJECT_ID || '',
  dataset: process.env.VITE_SANITY_DATASET || process.env.SANITY_STUDIO_DATASET || 'production',
  useCdn: false, // Don't use CDN for write operations
  apiVersion: '2024-01-01',
  token: writeToken, // Write token required
});

