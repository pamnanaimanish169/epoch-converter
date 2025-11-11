import { useEffect } from 'react';
import { Header } from './components/Header';
import { ConverterSection } from './components/ConverterSection';
import { CurrentEpochClock } from './components/CurrentEpochClock';
import { Footer } from './components/Footer';
import { SideNav } from './components/SideNav';
import { ToastContainer } from './components/Toast';
import { useTheme } from './hooks/useTheme';
import { useToast } from './hooks/useToast';
import useSEO from './hooks/useSEO';
import { Routes, Route, useLocation } from 'react-router-dom';
import About from './pages/About';
import FAQ from './pages/FAQ';

function App() {
  const { theme, toggleTheme } = useTheme();
  const { toasts, addToast, removeToast } = useToast();
  const location = useLocation();

  // Base URL for the site (update this with your actual domain)
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
  const currentUrl = `${baseUrl}${location.pathname}`;

  // SEO configuration based on current route
  const getSEOConfig = () => {
    const defaultConfig = {
      siteName: 'Epoch & Unix Timestamp Converter',
      locale: 'en_US',
      image: `${baseUrl}/epoch-converter-logo.png`,
    };

    switch (location.pathname) {
      case '/about':
        return {
          ...defaultConfig,
          title: 'About - Epoch & Unix Timestamp Converter | Unix Timestamp Tool',
          description: 'Learn about Epoch Tools - a fast, privacy-first epoch converter and unix time converter that turns raw timestamps into clear, readable dates.',
          keywords: 'epoch converter, unix timestamp, about epoch tools, time converter, developer tools',
          url: currentUrl,
          type: 'website' as const,
          structuredData: {
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "About Epoch & Unix Timestamp Converter",
            "description": "Learn about Epoch Tools - a fast, privacy-first epoch converter and unix time converter.",
            "author": {
              "@type": "Organization",
              "name": "Epoch Tools"
            },
            "publisher": {
              "@type": "Organization",
              "name": "Epoch Tools"
            }
          }
        };
      case '/faq':
        return {
          ...defaultConfig,
          title: 'FAQ - Epoch & Unix Timestamp Converter | Frequently Asked Questions',
          description: 'Frequently asked questions about epoch converter, unix timestamp conversion, ISO 8601 format, and time zone handling.',
          keywords: 'epoch converter FAQ, unix timestamp questions, epoch time help, timestamp converter FAQ',
          url: currentUrl,
          type: 'website' as const,
          structuredData: {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "What is an epoch converter?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "An epoch converter is a tool that helps you convert Unix timestamps into readable dates or times, and vice versa."
                }
              }
            ]
          }
        };
      default:
        return {
          ...defaultConfig,
          title: 'Epoch & Unix Timestamp Converter - Unix Timestamp Tool | Convert Time Online',
          description: 'Convert Unix timestamps to human-readable time and back instantly. Free online epoch converter with real-time conversion, batch processing, and developer tools.',
          keywords: 'epoch converter, unix timestamp, time converter, epoch time, unix time, timestamp converter, date converter, developer tools',
          url: currentUrl,
          type: 'website' as const,
          structuredData: {
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "Epoch & Unix Timestamp Converter",
            "description": "Convert Unix timestamps to human-readable time and back instantly",
            "applicationCategory": "UtilityApplication",
            "operatingSystem": "Any",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            }
          }
        };
    }
  };

  // Apply SEO configuration
  useSEO(getSEOConfig());

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        toggleTheme();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [toggleTheme]);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      addToast('Copied to clipboard!', 'success');
    }).catch(() => {
      addToast('Failed to copy', 'error');
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors flex flex-col">
      <Header />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <ConverterSection onCopy={handleCopy} />
                    <CurrentEpochClock onCopy={handleCopy} />
                    {/* Reserved for future tools/components */}
                  </>
                }
              />
              <Route path="/about" element={<About />} />
              <Route path="/faq" element={<FAQ />} />
            </Routes>
          </div>

          <div className="space-y-6">
            <SideNav onToggleTheme={toggleTheme} isDark={theme === 'dark'} />
          </div>
        </div>
      </main>

      <Footer />
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </div>
  );
}

export default App;
