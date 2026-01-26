export type TimeUnit = 'seconds' | 'milliseconds' | 'microseconds';

export interface ConversionResult {
  epoch: number;
  utcDate: string;
  localDate: string;
  unit: TimeUnit;
}

export interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

export interface Freebie {
  id: string;
  slug: string;
  title: string;
  description: string;
  shortDescription: string;
  thumbnail: string;
  coverImage: string;
  content: string;
  category?: string;
  tags?: string[];
  createdAt: string;
  updatedAt?: string;
  downloadCount?: number;
  downloadFile?: string; // URL to the downloadable file
  downloadUrl?: string; // Alternative external download URL
  relatedFreebies?: string[];
}
