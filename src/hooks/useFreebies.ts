import { useQuery } from '@tanstack/react-query';
import { 
  getAllFreebies, 
  getFreebieBySlug, 
  searchFreebies, 
  getFreebiesByCategory, 
  getRelatedFreebies 
} from '../services/freebiesService';
import type { Freebie } from '../types';

// Cache keys
export const freebiesKeys = {
  all: ['freebies'] as const,
  lists: () => [...freebiesKeys.all, 'list'] as const,
  list: (filters: string) => [...freebiesKeys.lists(), { filters }] as const,
  details: () => [...freebiesKeys.all, 'detail'] as const,
  detail: (slug: string) => [...freebiesKeys.details(), slug] as const,
  search: (query: string) => [...freebiesKeys.all, 'search', query] as const,
  category: (category: string) => [...freebiesKeys.all, 'category', category] as const,
  related: (id: string) => [...freebiesKeys.all, 'related', id] as const,
};

// Fetch all freebies
export function useFreebies() {
  return useQuery({
    queryKey: freebiesKeys.lists(),
    queryFn: getAllFreebies,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
}

// Fetch single freebie by slug
export function useFreebieBySlug(slug: string) {
  return useQuery({
    queryKey: freebiesKeys.detail(slug),
    queryFn: () => getFreebieBySlug(slug),
    enabled: !!slug,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
}

// Search freebies
export function useSearchFreebies(query: string) {
  return useQuery({
    queryKey: freebiesKeys.search(query),
    queryFn: () => searchFreebies(query),
    enabled: query.length > 0,
    staleTime: 2 * 60 * 1000, // 2 minutes for search
  });
}

// Get freebies by category
export function useFreebiesByCategory(category: string) {
  return useQuery({
    queryKey: freebiesKeys.category(category),
    queryFn: () => getFreebiesByCategory(category),
    enabled: !!category,
    staleTime: 5 * 60 * 1000,
  });
}

// Get related freebies
export function useRelatedFreebies(freebieId: string, limit: number = 3) {
  return useQuery({
    queryKey: freebiesKeys.related(freebieId),
    queryFn: () => getRelatedFreebies(freebieId, limit),
    enabled: !!freebieId,
    staleTime: 5 * 60 * 1000,
  });
}