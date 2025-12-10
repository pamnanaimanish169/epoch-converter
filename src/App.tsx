import { useEffect } from 'react';
import { Header } from './components/Header';
import { ConverterSection } from './components/ConverterSection';
import { WeekNumber } from './components/WeekNumber';
import { Footer } from './components/Footer';
import { SideNav } from './components/SideNav';
import { ToastContainer } from './components/Toast';
import { ConverterSectionSEOContent } from './components/ConverterSectionSEOContent';
import { useTheme } from './hooks/useTheme';
import { useToast } from './hooks/useToast';
import useSEO from './hooks/useSEO';
import { Routes, Route, useLocation } from 'react-router-dom';
import About from './pages/About';
import FAQ from './pages/FAQ';
import Countdown from './pages/Countdown';

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
      siteName: 'Unix Timestamp Converter | Convert Epoch Time to Date Instantly',
      locale: 'en_US',
      image: `${baseUrl}/epoch-converter-logo.png`,
    };

    switch (location.pathname) {
      case '/about':
        return {
          ...defaultConfig,
          title: 'About - Unix Timestamp Converter | Convert Epoch Time to Date Instantly',
          description: 'Learn about Epoch Tools - a fast, privacy-first epoch converter and unix time converter that turns raw timestamps into clear, readable dates.',
          keywords: 'epoch converter, unix timestamp, about epoch tools, time converter, developer tools',
          url: currentUrl,
          type: 'website' as const,
          structuredData: {
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "About - Unix Timestamp Converter | Convert Epoch Time to Date Instantly",
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
          title: 'FAQ - Unix Timestamp Converter | Convert Epoch Time to Date Instantly',
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
      case '/week-number':
        return {
          ...defaultConfig,
          title: 'Unix Timestamp Converter | Convert Epoch Time to Date Instantly - Week Number Calculator',
          description: 'Find out what week number it is today. Get the current ISO 8601 week number instantly with copy functionality. Free week number calculator tool.',
          keywords: 'week number, current week number, week number today, ISO week number, week calculator, what week is it',
          url: currentUrl,
          type: 'website' as const,
          structuredData: {
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "Current Week Number Calculator",
            "description": "Find out what week number it is today using ISO 8601 standard",
            "applicationCategory": "UtilityApplication",
            "operatingSystem": "Any",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            }
          }
        };
      case '/countdown': {
        // Get target epoch from URL params for dynamic title
        const targetParam = new URLSearchParams(location.search).get("target");
        const Y2038_TIMESTAMP = 2147483647;
        const targetEpoch = targetParam ? parseInt(targetParam, 10) : Y2038_TIMESTAMP;
        const formattedTarget = isNaN(targetEpoch) 
          ? Y2038_TIMESTAMP.toLocaleString() 
          : targetEpoch.toLocaleString();
        
        return {
          ...defaultConfig,
          title: `Countdown to Unix Time ${formattedTarget} | Unix Timestamp Converter`,
          description: 'Countdown in seconds to any Unix timestamp. Real-time countdown calculator for Unix epoch time with GMT display. Free countdown tool for developers.',
          keywords: 'unix countdown, epoch countdown, timestamp countdown, unix time countdown, countdown calculator, epoch timer',
          url: currentUrl,
          type: 'website' as const,
          structuredData: {
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": `Countdown to Unix Time ${formattedTarget}`,
            "description": "Countdown in seconds to any Unix timestamp with real-time updates",
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
      default:
        return {
          ...defaultConfig,
          title: 'Free Online Unix Timestamp Converter - Epoch to Date (UTC/IST) | Epoch Tools',
          description: 'Convert Unix timestamps to human-readable dates instantly. Supports seconds, milliseconds, UTC/IST timezones, and DST. Free developer tool with code examples and timezone debugging.',
          keywords: 'epoch converter, unix timestamp, time converter, epoch time, unix time, timestamp converter, date converter, developer tools',
          url: currentUrl,
          type: 'website' as const,
          structuredData: {
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "Unix Timestamp Converter | Convert Epoch Time to Date Instantly",
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
                    <ConverterSectionSEOContent />
                    {/* <CurrentEpochClock onCopy={handleCopy} /> */}
                  </>
                }
              />
              <Route path="/week-number" element={<WeekNumber onCopy={handleCopy} />} />
              <Route path="/countdown" element={<Countdown onCopy={handleCopy} />} />
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
