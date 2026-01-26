import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Download, ArrowLeft, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { useFreebieBySlug } from '../hooks/useFreebies';

export const FreebieDownload = () => {
  const { slug } = useParams<{ slug: string }>();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { data: freebie, isLoading, error } = useFreebieBySlug(slug || '');
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadError, setDownloadError] = useState<string | null>(null);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  useEffect(() => {
    if (freebie && !isDownloading && !downloadSuccess && !downloadError) {
      // Auto-trigger download when freebie is loaded
      handleDownload();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [freebie]);

  const handleDownload = async () => {
    if (!freebie) return;

    const downloadUrl = freebie.downloadFile || freebie.downloadUrl;

    if (!downloadUrl) {
      setDownloadError('Download file not available for this freebie.');
      return;
    }

    setIsDownloading(true);
    setDownloadError(null);

    try {
      // Create a temporary anchor element to trigger download
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = `${freebie.slug}.${getFileExtension(downloadUrl)}`;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      
      // Append to body, click, and remove
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Track download (optional - you can call an API here)
      // await trackDownload(freebie.id);

      setDownloadSuccess(true);
      
      // Redirect to detail page after 2 seconds
      setTimeout(() => {
        navigate(`/freebies/${freebie.slug}`);
      }, 2000);
    } catch (err) {
      console.error('Download error:', err);
      setDownloadError('Failed to download file. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  };

  const getFileExtension = (url: string): string => {
    try {
      const urlObj = new URL(url);
      const pathname = urlObj.pathname;
      const match = pathname.match(/\.([^.]+)$/);
      return match ? match[1] : 'file';
    } catch {
      return 'file';
    }
  };

  if (isLoading) {
    return (
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-800 p-6">
        <div className="flex flex-col items-center justify-center py-12">
          <Loader2 className="w-12 h-12 animate-spin text-blue-500 mb-4" />
          <p className="text-gray-600 dark:text-gray-400">
            {t('freebies.download.loading') || 'Preparing download...'}
          </p>
        </div>
      </div>
    );
  }

  if (error || !freebie) {
    return (
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-800 p-6">
        <div className="flex flex-col items-center justify-center py-12">
          <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            {t('freebies.download.notFound') || 'Freebie Not Found'}
          </h1>
          <p className="text-gray-700 dark:text-gray-300 mb-4 text-center">
            {t('freebies.download.notFoundDescription') || 
              'The freebie you are looking for does not exist or has been removed.'}
          </p>
          <Link
            to="/freebies"
            className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline"
          >
            <ArrowLeft className="w-4 h-4" />
            {t('freebies.download.backToListing') || 'Back to Freebies'}
          </Link>
        </div>
      </div>
    );
  }

  if (downloadSuccess) {
    return (
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-800 p-6">
        <div className="flex flex-col items-center justify-center py-12">
          <CheckCircle2 className="w-16 h-16 text-green-500 mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            {t('freebies.download.success') || 'Download Started!'}
          </h1>
          <p className="text-gray-700 dark:text-gray-300 mb-6 text-center">
            {t('freebies.download.successMessage') || 
              'Your download should start shortly. Redirecting to freebie page...'}
          </p>
          <Link
            to={`/freebies/${freebie.slug}`}
            className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline"
          >
            <ArrowLeft className="w-4 h-4" />
            {t('freebies.download.viewFreebie') || 'View Freebie Details'}
          </Link>
        </div>
      </div>
    );
  }

  if (downloadError) {
    return (
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-800 p-6">
        <div className="flex flex-col items-center justify-center py-12">
          <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            {t('freebies.download.error') || 'Download Error'}
          </h1>
          <p className="text-gray-700 dark:text-gray-300 mb-6 text-center">
            {downloadError}
          </p>
          <div className="flex gap-4">
            <button
              onClick={handleDownload}
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
            >
              <Download className="w-4 h-4" />
              {t('freebies.download.retry') || 'Try Again'}
            </button>
            <Link
              to={`/freebies/${freebie.slug}`}
              className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline"
            >
              <ArrowLeft className="w-4 h-4" />
              {t('freebies.download.back') || 'Back'}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-800 p-6">
      <div className="flex flex-col items-center justify-center py-12">
        <Download className="w-12 h-12 text-blue-500 mb-4" />
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          {freebie.title}
        </h1>
        <p className="text-gray-700 dark:text-gray-300 mb-6 text-center">
          {t('freebies.download.preparing') || 'Preparing your download...'}
        </p>
        {isDownloading && (
          <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
        )}
      </div>
    </div>
  );
};

