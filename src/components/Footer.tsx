import { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

export const Footer = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (date: Date, isUTC: boolean = false) => {
    const hours = isUTC ? date.getUTCHours() : date.getHours();
    const minutes = isUTC ? date.getUTCMinutes() : date.getMinutes();
    const seconds = isUTC ? date.getUTCSeconds() : date.getSeconds();

    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 transition-colors mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-6 text-sm">
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
              <Clock className="w-4 h-4" />
              <span className="font-mono">Local: {formatTime(currentTime)}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
              <Clock className="w-4 h-4" />
              <span className="font-mono">UTC: {formatTime(currentTime, true)}</span>
            </div>
          </div>

          {/* <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
            <a href="#about" className="hover:text-blue-500 transition-colors">
              About
            </a>
            <span className="text-gray-300 dark:text-gray-700">|</span>
            <a href="#docs" className="hover:text-blue-500 transition-colors">
              Docs
            </a>
            <span className="text-gray-300 dark:text-gray-700">|</span>
            <a href="#api" className="hover:text-blue-500 transition-colors">
              API
            </a>
          </div> */}
        </div>

        <div className="mt-4 text-center text-xs text-gray-400 dark:text-gray-600">
          © {currentTime.getFullYear()} Epoch Tools.
        </div>
      </div>
    </footer>
  );
};
