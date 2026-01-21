import { useEffect } from 'react';

// Type definitions for structured data (Schema.org)
interface Organization {
  "@type": "Organization";
  name: string;
  logo?: {
    "@type": "ImageObject";
    url: string;
  };
}

interface Person {
  "@type": "Person";
  name: string;
}

interface PostalAddress {
  "@type": "PostalAddress";
  streetAddress?: string;
  addressLocality?: string;
  addressRegion?: string;
  postalCode?: string;
  addressCountry?: string;
}

interface Offer {
  "@type": "Offer";
  url: string;
  priceCurrency: string;
  price: number | string;
  availability: string;
  seller?: Organization;
}

interface ProductSchema {
  "@context": "https://schema.org/" | "https://schema.org";
  "@type": "Product";
  name: string;
  image?: string | string[];
  description?: string;
  brand?: Organization | string;
  offers?: Offer;
  aggregateRating?: {
    "@type": "AggregateRating";
    ratingValue: number;
    reviewCount: number;
  };
}

interface ArticleSchema {
  "@context": "https://schema.org" | "https://schema.org/";
  "@type": "Article";
  headline: string;
  description?: string;
  image?: string | string[];
  author: Person | Organization;
  publisher?: Organization;
  datePublished?: string;
  dateModified?: string;
}

interface LocalBusinessSchema {
  "@context": "https://schema.org" | "https://schema.org/";
  "@type": "LocalBusiness";
  name: string;
  address?: PostalAddress;
  telephone?: string;
  email?: string;
  url?: string;
  openingHours?: string[];
}

// Union type for all possible structured data schemas
type StructuredData = ProductSchema | ArticleSchema | LocalBusinessSchema | Record<string, any>;

// Main SEO hook interface
interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'product' | 'profile' | 'book' | 'music' | 'video';
  robots?: string;
  canonical?: string;
  structuredData?: StructuredData;
  author?: string;
  siteName?: string;
  locale?: string;
  twitterHandle?: string;
}

// Single hook that handles all SEO needs
const useSEO = ({
  title,
  description,
  keywords,
  image,
  url,
  type = 'website',
  robots = 'index,follow',
  canonical,
  structuredData,
  author,
  siteName,
  locale = 'en_US',
  twitterHandle
}: SEOProps): void => {
  useEffect(() => {
    // Set page title
    if (title) {
      document.title = title;
    }

    // Set HTML lang attribute based on locale
    if (locale) {
      const htmlLang = locale === 'zh_CN' ? 'zh-CN' : 'en';
      document.documentElement.lang = htmlLang;
    }

    // Helper function to update or create meta tags
    const setMetaTag = (selector: string, attribute: string, value: string): void => {
      if (!value) return;
      
      let tag = document.querySelector(selector) as HTMLMetaElement;
      if (!tag) {
        tag = document.createElement('meta');
        if (selector.includes('name=')) {
          const nameMatch = selector.match(/name="([^"]+)"/);
          if (nameMatch) tag.name = nameMatch[1];
        } else if (selector.includes('property=')) {
          const propertyMatch = selector.match(/property="([^"]+)"/);
          if (propertyMatch) tag.setAttribute('property', propertyMatch[1]);
        }
        document.head.appendChild(tag);
      }
      tag.setAttribute(attribute, value);
    };

    // Set basic meta tags
    setMetaTag('meta[name="description"]', 'content', description || '');
    setMetaTag('meta[name="keywords"]', 'content', keywords || '');
    setMetaTag('meta[name="robots"]', 'content', robots);
    setMetaTag('meta[name="author"]', 'content', author || '');

    // Set Open Graph tags
    setMetaTag('meta[property="og:title"]', 'content', title || '');
    setMetaTag('meta[property="og:description"]', 'content', description || '');
    setMetaTag('meta[property="og:type"]', 'content', type);
    setMetaTag('meta[property="og:url"]', 'content', url || '');
    setMetaTag('meta[property="og:image"]', 'content', image || '');
    setMetaTag('meta[property="og:site_name"]', 'content', siteName || '');
    setMetaTag('meta[property="og:locale"]', 'content', locale);

    // Set Twitter Card tags
    setMetaTag('meta[name="twitter:card"]', 'content', 'summary_large_image');
    setMetaTag('meta[name="twitter:title"]', 'content', title || '');
    setMetaTag('meta[name="twitter:description"]', 'content', description || '');
    setMetaTag('meta[name="twitter:image"]', 'content', image || '');
    setMetaTag('meta[name="twitter:site"]', 'content', twitterHandle || '');

    // Set canonical URL
    const canonicalUrl = canonical || url;
    if (canonicalUrl) {
      let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
      if (!link) {
        link = document.createElement('link');
        link.rel = 'canonical';
        document.head.appendChild(link);
      }
      link.href = canonicalUrl;
    }

    // Set hreflang tags
    const baseUrl = 'https://epoch-tools.com';
    const currentPath = typeof window !== 'undefined' ? window.location.pathname : '/';
    
    // Helper function to set or update hreflang link
    const setHreflangTag = (lang: string, href: string): void => {
      const selector = `link[rel="alternate"][hreflang="${lang}"]`;
      let link = document.querySelector(selector) as HTMLLinkElement;
      if (!link) {
        link = document.createElement('link');
        link.rel = 'alternate';
        link.setAttribute('hreflang', lang);
        document.head.appendChild(link);
      }
      link.href = href;
    };

    // Set hreflang tags for both languages
    // For home page, use clean URLs as specified
    if (currentPath === '/') {
      setHreflangTag('en', `${baseUrl}/`);
      setHreflangTag('zh-CN', `${baseUrl}/?lang=zh-CN`);
    } else {
      // For other pages, preserve the path
      const urlEn = new URL(`${baseUrl}${currentPath}`);
      urlEn.searchParams.delete('lang');
      setHreflangTag('en', urlEn.toString());
      
      const urlZh = new URL(`${baseUrl}${currentPath}`);
      urlZh.searchParams.set('lang', 'zh-CN');
      setHreflangTag('zh-CN', urlZh.toString());
    }

    // Add structured data
    if (structuredData) {
      let script = document.querySelector('#structured-data') as HTMLScriptElement;
      if (script) {
        document.head.removeChild(script);
      }
      script = document.createElement('script');
      script.type = 'application/ld+json';
      script.id = 'structured-data';
      script.textContent = JSON.stringify(structuredData);
      document.head.appendChild(script);
    }

  }, [title, description, keywords, image, url, type, robots, canonical, structuredData, author, siteName, locale, twitterHandle]);
};

export default useSEO;
export type { SEOProps, ProductSchema, ArticleSchema, LocalBusinessSchema, StructuredData };

