import { useState } from 'react';
import { Mail, Loader2, CheckCircle2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface EmailCaptureProps {
  freebieTitle: string;
  onSubmit: (email: string) => Promise<void>;
}

export const EmailCapture = ({ freebieTitle, onSubmit }: EmailCaptureProps) => {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email.trim()) {
      setError(t('freebies.emailCapture.errors.required'));
      return;
    }

    if (!validateEmail(email)) {
      setError(t('freebies.emailCapture.errors.invalid'));
      return;
    }

    setIsLoading(true);
    try {
      await onSubmit(email);
      setIsSuccess(true);
      setEmail('');
    } catch (err) {
      setError(t('freebies.emailCapture.errors.submitFailed'));
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-6">
        <div className="flex items-start gap-3">
          <CheckCircle2 className="w-6 h-6 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="text-lg font-semibold text-green-900 dark:text-green-100 mb-1">
              {t('freebies.emailCapture.success.title')}
            </h3>
            <p className="text-sm text-green-700 dark:text-green-300">
              {t('freebies.emailCapture.success.message')}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6 sticky top-6">
      <div className="mb-4">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
          {t('freebies.emailCapture.title')}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {t('freebies.emailCapture.description', { title: freebieTitle })}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="sr-only">
            {t('freebies.emailCapture.emailLabel')}
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError('');
              }}
              placeholder={t('freebies.emailCapture.placeholder')}
              className={`w-full pl-10 pr-4 py-3 bg-white dark:bg-gray-900 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white ${
                error
                  ? 'border-red-300 dark:border-red-700'
                  : 'border-gray-300 dark:border-gray-700'
              }`}
              disabled={isLoading}
              required
            />
          </div>
          {error && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400" role="alert">
              {error}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>{t('freebies.emailCapture.submitting')}</span>
            </>
          ) : (
            <span>{t('freebies.emailCapture.buttonText')}</span>
          )}
        </button>

        <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
          {t('freebies.emailCapture.privacyNote')}{' '}
          <a
            href="/about"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            {t('freebies.emailCapture.privacyLink')}
          </a>
        </p>
      </form>
    </div>
  );
};

