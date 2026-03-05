import { sanityClient, getSanityImageUrl } from '../lib/sanity';
import type { Freebie } from '../types';

// GROQ query to fetch all freebies
const FREEBIES_QUERY = `*[_type == "freebie" && defined(slug.current)] | order(createdAt desc) {
  _id,
  title,
  description,
  "shortDescription": shortDescription,
  "slug": slug.current,
  "thumbnail": thumbnail,
  "coverImage": coverImage,
  category,
  tags,
  createdAt,
  updatedAt,
  downloadCount,
  "downloadFile": downloadFile.asset->url,
  downloadUrl,
  "relatedFreebies": relatedFreebies[]->{
    _id,
    title,
    "slug": slug.current,
    "thumbnail": thumbnail
  }
}`;

// GROQ query to fetch single freebie by slug
const FREEBIE_BY_SLUG_QUERY = `*[_type == "freebie" && slug.current == $slug][0] {
  _id,
  title,
  description,
  "shortDescription": shortDescription,
  "slug": slug.current,
  "thumbnail": thumbnail,
  "coverImage": coverImage,
  content,
  category,
  tags,
  createdAt,
  updatedAt,
  downloadCount,
  "downloadFile": downloadFile.asset->url,
  downloadUrl,
  "relatedFreebies": relatedFreebies[]->{
    _id,
    title,
    "shortDescription": shortDescription,
    "slug": slug.current,
    "thumbnail": thumbnail,
    category,
    tags,
    downloadCount
  }
}`;

// GROQ query to search freebies
const SEARCH_FREEBIES_QUERY = `*[_type == "freebie" && (
  title match $query ||
  description match $query ||
  category match $query ||
  tags[] match $query
)] | order(createdAt desc) {
  _id,
  title,
  description,
  "shortDescription": shortDescription,
  "slug": slug.current,
  "thumbnail": thumbnail,
  "coverImage": coverImage,
  category,
  tags,
  createdAt,
  downloadCount
}`;

// Transform Sanity image to URL
function transformImage(image: any, width?: number, height?: number): string {
  if (!image || !image.asset) {
    return '';
  }
  return getSanityImageUrl(image, width, height);
}

// Transform Sanity freebie to app Freebie type
function transformFreebie(sanityFreebie: any): Freebie {
  return {
    id: sanityFreebie._id,
    slug: sanityFreebie.slug,
    title: sanityFreebie.title,
    description: sanityFreebie.description,
    shortDescription: sanityFreebie.shortDescription,
    thumbnail: transformImage(sanityFreebie.thumbnail, 600, 400),
    coverImage: transformImage(sanityFreebie.coverImage, 1200, 675),
    content: sanityFreebie.content || '', // Will be handled by PortableText component
    category: sanityFreebie.category,
    tags: sanityFreebie.tags || [],
    createdAt: sanityFreebie.createdAt,
    updatedAt: sanityFreebie.updatedAt,
    downloadCount: sanityFreebie.downloadCount || 0,
    downloadFile: sanityFreebie.downloadFile || undefined,
    downloadUrl: sanityFreebie.downloadUrl || undefined,
    relatedFreebies: sanityFreebie.relatedFreebies?.map((rf: any) => rf._id) || [],
  };
}

// Fetch all freebies
export async function getAllFreebies(): Promise<Freebie[]> {
  try {
    // Use 'published' perspective to only fetch published documents
    // In development, you can temporarily use 'raw' to see drafts
    const perspective = import.meta.env.DEV ? 'published' : 'published';
    
    const data = await sanityClient.fetch(FREEBIES_QUERY, {}, {
      perspective,
    });
    
    return data.map(transformFreebie);
  } catch (error) {
    console.error('Error fetching freebies:', error);
    throw error;
  }
}

// Fetch freebie by slug
export async function getFreebieBySlug(slug: string): Promise<Freebie | null> {
  try {
    const perspective = 'published';
    const data = await sanityClient.fetch(FREEBIE_BY_SLUG_QUERY, { slug }, {
      perspective,
    });
    if (!data) return null;
    return transformFreebie(data);
  } catch (error) {
    console.error('Error fetching freebie:', error);
    throw error;
  }
}

// Search freebies
export async function searchFreebies(query: string): Promise<Freebie[]> {
  try {
    const searchQuery = `*${query}*`;
    const perspective = 'published';
    // Type assertion needed due to GROQ match operator type inference limitations
    const data = await sanityClient.fetch(SEARCH_FREEBIES_QUERY, { 
      query: searchQuery 
    } as any, {
      perspective,
    });
    return data.map(transformFreebie);
  } catch (error) {
    console.error('Error searching freebies:', error);
    throw error;
  }
}

// Get freebies by category
export async function getFreebiesByCategory(category: string): Promise<Freebie[]> {
  try {
    const query = `*[_type == "freebie" && category == $category] | order(createdAt desc) {
      _id,
      title,
      description,
      "shortDescription": shortDescription,
      "slug": slug.current,
      "thumbnail": thumbnail,
      "coverImage": coverImage,
      category,
      tags,
      createdAt,
      downloadCount
    }`;
    const perspective = 'published';
    const data = await sanityClient.fetch(query, { category }, {
      perspective,
    });
    return data.map(transformFreebie);
  } catch (error) {
    console.error('Error fetching freebies by category:', error);
    throw error;
  }
}

// Get related freebies
export async function getRelatedFreebies(
  freebieId: string,
  limit: number = 3
): Promise<Freebie[]> {
  try {
    const query = `*[_type == "freebie" && _id == $freebieId][0] {
      "relatedFreebies": relatedFreebies[0...$limit]->{
        _id,
        title,
        "shortDescription": shortDescription,
        "slug": slug.current,
        "thumbnail": thumbnail,
        category,
        tags,
        downloadCount
      }
    }`;
    const perspective = 'published';
    const data = await sanityClient.fetch(query, { freebieId, limit }, {
      perspective,
    });
    const related = data?.relatedFreebies || [];
    return related.map(transformFreebie);
  } catch (error) {
    console.error('Error fetching related freebies:', error);
    return [];
  }
}