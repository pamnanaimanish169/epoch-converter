import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, Calendar, Download, Tag } from 'lucide-react';
import { EmailCapture } from '../components/EmailCapture';
import { FreebieCard } from '../components/FreebieCard';
import { getFreebieBySlug, getRelatedFreebies } from '../utils/freebiesData';

export const FreebieDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const { t } = useTranslation();

  const freebie = slug ? getFreebieBySlug(slug) : undefined;
  const relatedFreebies = freebie ? getRelatedFreebies(freebie, 3) : [];

  const handleEmailSubmit = async (email: string) => {
    if (!freebie) {
      throw new Error('Freebie not found');
    }

    // Use VITE_API_URL if set, otherwise use relative path (Vite proxy handles it)
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

  if (!freebie) {
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

  // Convert markdown-like content to HTML (simple implementation)
  const formatContent = (content: string) => {
    return content
      .split('\n')
      .map((line, index) => {
        // Headers
        if (line.startsWith('# ')) {
          return <h1 key={index} className="text-3xl font-bold text-gray-900 dark:text-white mt-8 mb-4">{line.substring(2)}</h1>;
        }
        if (line.startsWith('## ')) {
          return <h2 key={index} className="text-2xl font-semibold text-gray-900 dark:text-white mt-6 mb-3">{line.substring(3)}</h2>;
        }
        if (line.startsWith('### ')) {
          return <h3 key={index} className="text-xl font-semibold text-gray-900 dark:text-white mt-4 mb-2">{line.substring(4)}</h3>;
        }
        // Lists
        if (line.startsWith('- ') || line.startsWith('* ')) {
          return <li key={index} className="ml-6 mb-1 text-gray-700 dark:text-gray-300">{line.substring(2)}</li>;
        }
        // Code blocks (simple detection)
        if (line.startsWith('```')) {
          return null; // Skip code block markers for now
        }
        // Bold text
        const boldLine = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        // Empty lines
        if (line.trim() === '') {
          return <br key={index} />;
        }
        // Regular paragraphs
        return <p key={index} className="mb-4 text-gray-700 dark:text-gray-300 leading-relaxed" dangerouslySetInnerHTML={{ __html: boldLine }} />;
      });
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
            {/* Title */}
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
              {formatContent(freebie.content)}
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

