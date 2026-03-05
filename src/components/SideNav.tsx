import { useState } from 'react';
import { Home, Sun, Moon, Info, HelpCircle, Calendar, RefreshCw, BookMarked, Timer, Languages, Clock, ChevronDown, ChevronRight, Globe, Gift } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getPopularTimezones } from '../utils/timezoneConfig';
import i18n from '../i18n';

interface SideNavProps {
  onToggleTheme: () => void;
  isDark: boolean;
}

export const SideNav = ({ onToggleTheme, isDark }: SideNavProps) => {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [isTimezoneExpanded, setIsTimezoneExpanded] = useState(false);
  const popularTimezones = getPopularTimezones();
  
  const toggleLanguage = () => {
    const currentLang = i18n.language;
    const newLang = currentLang === 'en' ? 'zh-CN' : 'en';
    i18n.changeLanguage(newLang);
    
    // Update URL parameter
    const newParams = new URLSearchParams(searchParams);
    newParams.set('lang', newLang);
    setSearchParams(newParams, { replace: true });
  };
  return (
    <aside className="sticky top-6">
      <nav className="p-4 transition-colors">
        <div className="space-y-6">
          <div>
            <h3 className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">{t('navigation.pages')}</h3>
            <ul className="space-y-1">
              <li>
                <Link to="/" className="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300">
                  <Home className="w-4 h-4" />
                  <span>{t('navigation.home')}</span>
                </Link>
              </li>
              <li>
                <Link to="/about" className="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300">
                  <Info className="w-4 h-4" />
                  <span>{t('navigation.about')}</span>
                </Link>
              </li>
              <li>
                <Link to="/faq" className="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300">
                  <HelpCircle className="w-4 h-4" />
                  <span>{t('navigation.faq')}</span>
                </Link>
              </li>
              <li>
                <Link to="https://blog.epoch-tools.com/" className="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300">
                  <BookMarked className="w-4 h-4" />
                  <span>{t('navigation.blogs')}</span>
                </Link>
              </li>
              <li>
                <Link to="/freebies" className="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300">
                  <Gift className="w-4 h-4" />
                  <span>{t('navigation.freebies')}</span>
                </Link>
              </li>
              <li>
                <button onClick={onToggleTheme} className="w-full flex items-center gap-2 px-2 py-1.5 rounded hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300">
                  {isDark ? <Sun className="w-4 h-4 text-yellow-500" /> : <Moon className="w-4 h-4" />}
                  <span>{t('navigation.toggleTheme')}</span>
                </button>
              </li>
              <li>
                <button onClick={toggleLanguage} className="w-full flex items-center gap-2 px-2 py-1.5 rounded hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300">
                  <Languages className="w-4 h-4" />
                  <span>{i18n.language === 'en' ? '中文' : 'English'}</span>
                </button>
              </li>
            </ul>
          </div>
        </div>
        <div>
            <h3 className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">{t('navigation.tools')}</h3>
            <ul className="space-y-1">
              <li>
                <Link to="/" className="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300">
                  <RefreshCw className="w-4 h-4" />
                  <span>{t('navigation.epochConverter')}</span>
                </Link>
              </li>
              {/* <li>
                <Link to="/week-number" className="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300">
                  <Calendar className="w-4 h-4" />
                  <span>{t('navigation.weekNumber')}</span>
                </Link>
              </li> */}
              <li>
                <Link to="/epoch-countdown" className="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300">
                  <Timer className="w-4 h-4" />
                  <span>{t('navigation.countdown')}</span>
                </Link>
              </li>
              <li>
                <Link to="/unix-countdown" className="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300">
                  <Clock className="w-4 h-4" />
                  <span>{t('navigation.unixCountdown')}</span>
                </Link>
              </li>
              <li>
                <button
                  onClick={() => setIsTimezoneExpanded(!isTimezoneExpanded)}
                  className="w-full flex items-center gap-2 px-2 py-1.5 rounded hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
                >
                  {isTimezoneExpanded ? (
                    <ChevronDown className="w-4 h-4" />
                  ) : (
                    <ChevronRight className="w-4 h-4" />
                  )}
                  <Globe className="w-4 h-4" />
                  <span>Timezone Converters</span>
                </button>
                {isTimezoneExpanded && (
                  <ul className="ml-6 mt-1 space-y-1">
                    {popularTimezones.map((tz) => (
                      <li key={tz.code}>
                        <Link
                          to={`/epoch-to-${tz.code.toLowerCase()}`}
                          className="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400 text-sm"
                        >
                          <span>{tz.code}</span>
                          <span className="text-xs text-gray-500 dark:text-gray-500">({tz.utcOffset})</span>
                        </Link>
                      </li>
                    ))}
                    <li>
                      <Link
                        to="/timezones"
                        className="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400 text-sm font-medium"
                      >
                        <span>View All 43 Timezones →</span>
                      </Link>
                    </li>
                  </ul>
                )}
              </li>
            </ul>
          </div>
      </nav>
    </aside>
  );
};


