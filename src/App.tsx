import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Header } from './components/Header';
import { ConverterSection } from './components/ConverterSection';
import { WeekNumber } from './components/WeekNumber';
import { Footer } from './components/Footer';
import { SideNav } from './components/SideNav';
import { ToastContainer } from './components/Toast';
import { ConverterSectionSEOContent } from './components/ConverterSectionSEOContent';
import { WeekNumberSEOSection } from './components/WeekNumberSEOSection';
import { CountdownSEOSection } from './components/CountdownSEOSection';
import { useTheme } from './hooks/useTheme';
import { useToast } from './hooks/useToast';
import useSEO from './hooks/useSEO';
import { Routes, Route, useLocation, useSearchParams } from 'react-router-dom';
import About from './pages/About';
import FAQ from './pages/FAQ';
import Countdown from './pages/Countdown';
import i18n from './i18n';

function App() {
  const { t } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const { toasts, addToast, removeToast } = useToast();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  // Handle language from URL parameter
  useEffect(() => {
    const langParam = searchParams.get('lang');
    if (langParam === 'zh-CN' || langParam === 'zh') {
      if (i18n.language !== 'zh-CN') {
        i18n.changeLanguage('zh-CN');
      }
    } else if (langParam === 'en') {
      if (i18n.language !== 'en') {
        i18n.changeLanguage('en');
      }
    } else {
      // If no lang parameter, check if we should set default
      // This ensures the URL reflects the current language
      const currentLang = i18n.language;
      if (currentLang && !searchParams.has('lang')) {
        // Optionally set the lang param to match current language
        // Uncomment if you want URL to always show current language
        // setSearchParams({ lang: currentLang === 'zh-CN' ? 'zh-CN' : 'en' }, { replace: true });
      }
    }
  }, [searchParams, setSearchParams]);

  // Base URL for the site (update this with your actual domain)
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
  const currentUrl = `${baseUrl}${location.pathname}`;
  
  // Get current language
  const currentLang = i18n.language;
  const langParam = searchParams.get('lang');
  const isChinese = currentLang === 'zh-CN' || langParam === 'zh-CN' || langParam === 'zh';

  // SEO configuration based on current route
  const getSEOConfig = () => {
    // Determine canonical URL based on language and route
    const getCanonicalUrl = () => {
      if (location.pathname === '/') {
        // For home page, include lang parameter for Chinese, clean URL for English
        if (isChinese) {
          return `${baseUrl}/?lang=zh-CN`;
        }
        return `${baseUrl}/`;
      }
      // For other pages, properly handle query parameters
      if (isChinese) {
        const url = new URL(currentUrl);
        url.searchParams.set('lang', 'zh-CN');
        return url.toString();
      }
      // For English, return clean URL without lang parameter (but preserve other params if needed)
      const url = new URL(currentUrl);
      url.searchParams.delete('lang');
      return url.toString();
    };

    const defaultConfig = {
      siteName: 'Unix Timestamp Converter | Convert Epoch Time to Date Instantly',
      locale: isChinese ? 'zh_CN' : 'en_US',
      image: `${baseUrl}/epoch-converter-logo.png`,
      canonical: getCanonicalUrl(),
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
          title: 'Week Number Calculator – Current Week & ISO Week of the Year | Epoch Tools',
          description: 'Find the current week number (ISO 8601) and calculate the week of the year for any date with this free week number calculator.',
          keywords: 'week number, current week number, week number today, ISO week number, week calculator, what week is it',
          url: currentUrl,
          type: 'website' as const,
          structuredData: {
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Week Number Calculator – Current Week & ISO Week of the Year",
            "description": "Find the current week number (ISO 8601) and calculate the week of the year for any date.",
            "url": currentUrl,
            "datePublished": "2025-12-10",
            "dateModified": "2025-12-10",
            "author": { "@type": "Person", "name": "Manish Pamnani" }
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
          title: `Y2038 Countdown – Time Left Until the Year 2038 Problem (Epochalypse) | Epoch Tools`,
          description: 'Watch the live Y2038 countdown and see how much time is left until the Year 2038 problem (Epochalypse). Learn how Unix time overflows on 32‑bit systems and what it means for your code.',
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
          title: 'Unix Timestamp Converter | Convert Epoch Time to Date Instantly - Convert Time Online',
          description: 'Convert Unix timestamps to human-readable dates instantly. Supports seconds, milliseconds, UTC/IST timezones, and DST. Free developer tool with code examples and timezone debugging.',
          keywords: 'epoch converter, unix timestamp, time converter, epoch time, unix time, timestamp converter, date converter, developer tools',
          url: currentUrl,
          type: 'website' as const,
          structuredData: {
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Unix Timestamp Converter | Convert Epoch Time to Date Instantly",
            "description": "Convert Unix timestamps to human-readable time and back instantly",
            "datePublished": "2025-01-01",
            "dateModified": "2025-12-10",
            "author": {"@type": "Person", "name": "Manish Pamnani"},          
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
      addToast(t('toast.copied'), 'success');
    }).catch(() => {
      addToast(t('toast.copyFailed'), 'error');
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
              <Route
                path="/week-number"
                element={
                  <>
                    <WeekNumber onCopy={handleCopy} />
                    <WeekNumberSEOSection />
                  </>
                }
              />
              <Route
                path="/countdown"
                element={
                  <>
                    <Countdown onCopy={handleCopy} />
                    <CountdownSEOSection />
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
