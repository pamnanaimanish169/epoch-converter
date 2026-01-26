import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url';

// Sanity client configuration
export const sanityClient = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID || '',
  dataset: import.meta.env.VITE_SANITY_DATASET || 'production',
  // Disable CDN in development to avoid caching issues, enable in production
  useCdn: !import.meta.env.DEV, // Use CDN for faster responses in production
  apiVersion: '2024-01-01', // Use current date (YYYY-MM-DD) to target the latest API version
  token: import.meta.env.VITE_SANITY_API_TOKEN, // Optional, for authenticated requests
});

// Image URL builder
const builder = imageUrlBuilder(sanityClient);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

// Helper function to get image URL with transformations
export function getSanityImageUrl(
  source: SanityImageSource,
  width?: number,
  height?: number
): string {
  if (!source) return '';
  
  let imageBuilder = builder.image(source);
  
  if (width) {
    imageBuilder = imageBuilder.width(width);
  }
  
  if (height) {
    imageBuilder = imageBuilder.height(height);
  }
  
  return imageBuilder.url() || '';
}