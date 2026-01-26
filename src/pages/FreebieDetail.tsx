import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@tanstack/react-query';
import { ArrowLeft, Calendar, Download, Tag } from 'lucide-react';
import { PortableText } from '@portabletext/react';
import { EmailCapture } from '../components/EmailCapture';
import { FreebieCard } from '../components/FreebieCard';
import { useFreebieBySlug, useRelatedFreebies } from '../hooks/useFreebies';
import { sanityClient, getSanityImageUrl } from '../lib/sanity';

export const FreebieDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const { t } = useTranslation();

  const { data: freebie, isLoading, error } = useFreebieBySlug(slug || '');
  const { data: relatedFreebies = [] } = useRelatedFreebies(freebie?.id || '', 3);

  const handleEmailSubmit = async (email: string) => {
    if (!freebie) {
      throw new Error('Freebie not found');
    }

    const apiUrl = import.meta.env.VITE_API_URL || '';
    
    const response = await fetch(`${apiUrl}/api/subscribe`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        freebieId: freebie.slug,
        freebieTitle: freebie.title,
      }),
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(data.error || 'Failed to subscribe');
    }

    return data;
  };

  // Fetch full content with portable text
  const { data: fullContent } = useQuery({
    queryKey: ['freebie-content', slug],
    queryFn: async () => {
      if (!slug) return null;
      const query = `*[_type == "freebie" && slug.current == $slug][0] {
        content
      }`;
      return await sanityClient.fetch(query, { slug }, { perspective: 'published' });
    },
    enabled: !!slug,
  });

  if (isLoading) {
    return (
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-800 p-6">
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  if (error || !freebie) {
    return (
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-800 p-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          {t('freebies.detail.notFound')}
        </h1>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          {t('freebies.detail.notFoundDescription')}
        </p>
        <Link
          to="/freebies"
          className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline"
        >
          <ArrowLeft className="w-4 h-4" />
          {t('freebies.detail.backToListing')}
        </Link>
      </div>
    );
  }

  // Portable Text components for rendering
  const portableTextComponents = {
    types: {
      image: ({ value }: any) => (
        <img
          src={getSanityImageUrl(value)}
          alt={value.alt || ''}
          className="my-4 rounded-lg"
        />
      ),
    },
    block: {
      h1: ({ children }: any) => (
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
          {children}
        </h1>
      ),
      h2: ({ children }: any) => (
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-6 mb-3">
          {children}
        </h2>
      ),
      h3: ({ children }: any) => (
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-4 mb-2">
          {children}
        </h3>
      ),
      normal: ({ children }: any) => (
        <p className="mb-4 text-gray-700 dark:text-gray-300 leading-relaxed">
          {children}
        </p>
      ),
    },
    list: {
      bullet: ({ children }: any) => (
        <ul className="list-disc ml-6 mb-4">{children}</ul>
      ),
      number: ({ children }: any) => (
        <ol className="list-decimal ml-6 mb-4">{children}</ol>
      ),
    },
    listItem: {
      bullet: ({ children }: any) => (
        <li className="mb-1 text-gray-700 dark:text-gray-300">{children}</li>
      ),
    },
  };

  return (
    <div className="space-y-8">
      {/* Back Button */}
      <Link
        to="/freebies"
        className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>{t('freebies.detail.backToListing')}</span>
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Hero Section */}
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              {freebie.title}
            </h1>

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-4 mb-6 text-sm text-gray-600 dark:text-gray-400">
              {freebie.category && (
                <span className="flex items-center gap-1">
                  <Tag className="w-4 h-4" />
                  {freebie.category}
                </span>
              )}
              {freebie.createdAt && (
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {new Date(freebie.createdAt).toLocaleDateString()}
                </span>
              )}
              {freebie.downloadCount !== undefined && (
                <span className="flex items-center gap-1">
                  <Download className="w-4 h-4" />
                  {freebie.downloadCount.toLocaleString()} {t('freebies.detail.downloads')}
                </span>
              )}
            </div>

            {/* Cover Image */}
            <div className="mb-8 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800">
              <img
                src={freebie.coverImage}
                alt={freebie.title}
                className="w-full h-auto"
                loading="eager"
              />
            </div>
          </div>

          {/* Content Section */}
          <article className="bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-800 p-8">
            <div className="max-w-none text-base leading-relaxed">
              {fullContent?.content ? (
                <PortableText
                  value={fullContent.content}
                  components={portableTextComponents}
                />
              ) : (
                <p className="text-gray-700 dark:text-gray-300">
                  {freebie.description}
                </p>
              )}
            </div>
          </article>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <EmailCapture
            freebieTitle={freebie.title}
            onSubmit={handleEmailSubmit}
          />
        </div>
      </div>

      {/* Discover More Section */}
      {relatedFreebies.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            {t('freebies.detail.discoverMore')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedFreebies.map((related) => (
              <FreebieCard key={related.id} freebie={related} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};