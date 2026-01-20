import { useLocation } from 'react-router-dom';
import { TimezoneConverter } from '../components/TimezoneConverter';
import { TimezoneSEOContent } from '../components/TimezoneSEOContent';
import { getTimezoneConfig } from '../utils/timezoneConfig';

interface TimezonePageProps {
  onCopy: (text: string) => void;
}

export const TimezonePage = ({ onCopy }: TimezonePageProps) => {
  const location = useLocation();
  
  // Extract timezone code from URL pathname
  // URL pattern: /epoch-to-gmt, extract "gmt"
  const match = location.pathname.match(/^\/epoch-to-(.+)$/);
  
  // If this is not a timezone route, return null to let other routes handle it
  if (!match) {
    return null;
  }
  
  const timezone = match[1];
  
  // getTimezoneConfig handles special cases like "cst-cn"
  const timezoneConfig = getTimezoneConfig(timezone);

  if (!timezoneConfig) {
    return (
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-800 p-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Timezone Not Found
        </h1>
        <p className="text-gray-700 dark:text-gray-300">
          The timezone "{timezone}" is not available. Please check the URL and try again.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <TimezoneConverter timezoneConfig={timezoneConfig} onCopy={onCopy} />
      <TimezoneSEOContent timezoneConfig={timezoneConfig} />
    </div>
  );
};

