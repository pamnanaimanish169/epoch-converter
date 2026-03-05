import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Download, ArrowLeft, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { useFreebieBySlug } from '../hooks/useFreebies';

export const FreebieDownload = () => {
  const { slug } = useParams<{ slug: string }>();
  const [searchParams] = useSearchParams();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { data: freebie, isLoading, error } = useFreebieBySlug(slug || '');
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadError, setDownloadError] = useState<string | null>(null);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [hasTracked, setHasTracked] = useState(false);

  // Extract email and token from query params (for email downloads)
  const email = searchParams.get('email');
  const token = searchParams.get('token');
  const downloadSource = email ? 'email' : 'direct';

  // Debug logging
  useEffect(() => {
    console.log('FreebieDownload - State:', {
      slug,
      isLoading,
      hasFreebie: !!freebie,
      error,
      email: email ? 'present' : 'missing',
      token: token ? 'present' : 'missing',
    });
  }, [slug, isLoading, freebie, error, email, token]);

  useEffect(() => {
    if (freebie && !isDownloading && !downloadSuccess && !downloadError && !hasTracked) {
      // Auto-trigger download when freebie is loaded
      console.log('Auto-triggering download for:', freebie.slug);
      console.log('Download URL:', freebie.downloadFile || freebie.downloadUrl);
      handleDownload();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [freebie, isDownloading, downloadSuccess, downloadError, hasTracked]);

  const handleDownload = async () => {
    if (!freebie) {
      console.error('handleDownload called but freebie is null');
      return;
    }

    const downloadUrl = freebie.downloadFile || freebie.downloadUrl;
    console.log('handleDownload - downloadUrl:', downloadUrl);

    if (!downloadUrl) {
      console.error('No download URL available');
      setDownloadError('Download file not available for this freebie.');
      return;
    }

    // Prevent multiple calls
    if (isDownloading || hasTracked) {
      console.log('Download already in progress or tracked');
      return;
    }

    setIsDownloading(true);
    setDownloadError(null);

    try {
      // Track download before triggering it
      if (email) {
        try {
          const apiUrl = import.meta.env.VITE_API_URL || '';
          console.log('Calling track-download API:', `${apiUrl}/api/track-download`);
          const trackResponse = await fetch(`${apiUrl}/api/track-download`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email,
              freebieId: freebie.slug,
              downloadSource,
              token: token || undefined,
            }),
          });
          
          if (!trackResponse.ok) {
            const errorData = await trackResponse.json();
            console.error('Tracking API error:', errorData);
          } else {
            const trackData = await trackResponse.json();
            console.log('Download tracked successfully:', trackData);
          }
          setHasTracked(true);
        } catch (trackError) {
          // Don't block download if tracking fails
          console.error('Failed to track download:', trackError);
        }
      } else {
        // Skip tracking for direct page downloads without email
        console.log('No email provided, skipping tracking');
        setHasTracked(true);
      }

      // Create a temporary anchor element to trigger download
      console.log('Triggering file download:', downloadUrl);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = `${freebie.slug}.${getFileExtension(downloadUrl)}`;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      
      // Append to body, click, and remove
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      console.log('Download triggered successfully');
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
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-800 p-6 min-h-[400px]">
        <div className="flex flex-col items-center justify-center py-12">
          <Loader2 className="w-12 h-12 animate-spin text-blue-500 mb-4" />
          <p className="text-gray-600 dark:text-gray-400">
            {t('freebies.download.loading') || 'Preparing download...'}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
            Loading freebie: {slug}
          </p>
            <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg max-w-md">
              <p className="text-sm text-yellow-800 dark:text-yellow-200 text-center">
                <strong>Note:</strong> If the download doesn't start, check your browser's popup blocker. 
                Allow popups from <code className="bg-yellow-100 dark:bg-yellow-900/40 px-1 rounded">localhost</code> if prompted.
              </p>
            </div>
        </div>
      </div>
    );
  }

  if (error) {
    console.error('FreebieDownload error:', error);
    return (
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-800 p-6 min-h-[400px]">
        <div className="flex flex-col items-center justify-center py-12">
          <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            {t('freebies.download.error') || 'Error Loading Freebie'}
          </h1>
          <p className="text-gray-700 dark:text-gray-300 mb-4 text-center">
            {error instanceof Error ? error.message : 'Failed to load freebie. Please try again.'}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-500 mb-4">
            Slug: {slug}
          </p>
          <div className="flex gap-4">
            <button
              onClick={() => window.location.reload()}
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
            >
              Retry
            </button>
            <Link
              to="/freebies"
              className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline"
            >
              <ArrowLeft className="w-4 h-4" />
              {t('freebies.download.backToListing') || 'Back to Freebies'}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!freebie) {
    return (
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-800 p-6 min-h-[400px]">
        <div className="flex flex-col items-center justify-center py-12">
          <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            {t('freebies.download.notFound') || 'Freebie Not Found'}
          </h1>
          <p className="text-gray-700 dark:text-gray-300 mb-4 text-center">
            {t('freebies.download.notFoundDescription') || 
              'The freebie you are looking for does not exist or has been removed.'}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-500 mb-4">
            Slug: {slug}
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

  // Fallback render - shows if freebie is loaded but download hasn't started
  // This should only show briefly before auto-download triggers
  // const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
  
  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-800 p-6 min-h-[400px]">
      <div className="flex flex-col items-center justify-center py-12">
        <Download className="w-12 h-12 text-blue-500 mb-4" />
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          {freebie?.title || 'Preparing Download'}
        </h1>
        <p className="text-gray-700 dark:text-gray-300 mb-6 text-center">
          {t('freebies.download.preparing') || 'Preparing your download...'}
        </p>
        {isDownloading && (
          <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
        )}
        {!isDownloading && freebie && (
          <div className="flex flex-col items-center gap-4">
            <button
              onClick={handleDownload}
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
            >
              <Download className="w-4 h-4" />
              {t('freebies.download.startDownload') || 'Start Download'}
            </button>
            <p className="text-sm text-gray-500 dark:text-gray-500 text-center">
              If download doesn't start automatically, click the button above
            </p>
              <div className="mt-2 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg max-w-md">
                <p className="text-sm text-yellow-800 dark:text-yellow-200 text-center">
                  <strong>Popup Blocker Notice:</strong> Your browser may block the download. 
                  Look for a popup blocker icon in your address bar and click it to allow downloads from <code className="bg-yellow-100 dark:bg-yellow-900/40 px-1 rounded">localhost</code>.
                </p>
              </div>
            
          </div>
        )}
        {!freebie && (
          <p className="text-sm text-gray-500 dark:text-gray-500">
            Loading freebie data...
          </p>
        )}
      </div>
    </div>
  );
};

