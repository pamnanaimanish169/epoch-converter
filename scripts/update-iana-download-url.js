#!/usr/bin/env node

/**
 * Script to update the download URL for the IANA Timezones freebie
 * 
 * Usage:
 *   node scripts/update-iana-download-url.js
 * 
 * Requires environment variables:
 *   - VITE_SANITY_PROJECT_ID (or SANITY_STUDIO_PROJECT_ID)
 *   - VITE_SANITY_DATASET (or SANITY_STUDIO_DATASET)
 *   - VITE_SANITY_API_TOKEN (or SANITY_STUDIO_API_TOKEN) - Write token required
 */

import { createClient } from '@sanity/client';

const projectId = process.env.VITE_SANITY_PROJECT_ID || process.env.SANITY_STUDIO_PROJECT_ID || '9bvn6eic';
const dataset = process.env.VITE_SANITY_DATASET || process.env.SANITY_STUDIO_DATASET || 'production';
const token = process.env.VITE_SANITY_API_TOKEN || process.env.SANITY_STUDIO_API_TOKEN;

if (!token) {
  console.error('❌ Error: VITE_SANITY_API_TOKEN or SANITY_STUDIO_API_TOKEN environment variable is required');
  console.error('   Get your token from: https://www.sanity.io/manage');
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2024-01-01',
  token,
  useCdn: false,
});

const DOCUMENT_ID = '414e8e8f-c1e9-4fe1-b788-a212f37a0cbc';
const NEW_DOWNLOAD_URL = 'https://cdn.sanity.io/files/9bvn6eic/production/6a6e1329ac72070d22a174fb384351526df810e9.pdf';

async function updateDownloadUrl() {
  try {
    console.log(`📝 Updating download URL for IANA Timezones freebie...`);
    console.log(`   Project: ${projectId}`);
    console.log(`   Dataset: ${dataset}`);
    console.log(`   Document ID: ${DOCUMENT_ID}`);
    console.log(`   New URL: ${NEW_DOWNLOAD_URL}`);
    console.log('');

    // Update the downloadUrl field
    const result = await client
      .patch(DOCUMENT_ID)
      .set({ downloadUrl: NEW_DOWNLOAD_URL })
      .commit();

    console.log('✅ Successfully updated download URL!');
    console.log(`   Document updated at: ${result._updatedAt}`);
    console.log('');
    console.log('📋 Next steps:');
    console.log('   1. Verify the update in Sanity Studio: http://localhost:3333');
    console.log('   2. Test the download link on your site');
    
  } catch (error) {
    console.error('❌ Error updating download URL:');
    console.error(error.message);
    if (error.response) {
      console.error('Response:', JSON.stringify(error.response, null, 2));
    }
    process.exit(1);
  }
}

updateDownloadUrl();




