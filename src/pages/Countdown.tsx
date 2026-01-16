import { useState, useEffect } from "react";
import {
  formatDateTimeString,
} from "../utils/epochUtils";

interface CountdownProps {
  onCopy: (text: string) => void;
}

export const Countdown = ({ onCopy: _onCopy }: CountdownProps) => {
  // Y2038 problem: January 19, 2038 03:14:07 UTC (2^31 - 1 = 2,147,483,647 seconds)
  const Y2038_TIMESTAMP = 2147483647;
  
  const [countdown, setCountdown] = useState<number>(0);
  const [targetDate, setTargetDate] = useState<Date | null>(null);

  // Calculate countdown to fixed Y2038 date
  useEffect(() => {
    const targetMs = Y2038_TIMESTAMP * 1000;
    const target = new Date(targetMs);
    
    setTargetDate(target);

    const updateCountdown = () => {
      const now = Date.now();
      const diff = Math.floor((targetMs - now) / 1000);
      setCountdown(isFinite(diff) ? diff : 0);
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatCountdown = (seconds: number): string => {
    return seconds.toLocaleString();
  };

  const getCountdownLabel = (seconds: number): string => {
    if (seconds < 0) {
      return `Time since ${
        targetDate
          ? formatDateTimeString(targetDate, true).replace(" UTC", " GMT")
          : ""
      }`;
    }
    return `Countdown to ${Y2038_TIMESTAMP.toLocaleString()}, ${
      targetDate
        ? formatDateTimeString(targetDate, true).replace(" UTC", " GMT")
        : ""
    }`;
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-800 p-6 transition-colors">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
        {/* <Clock className="w-6 h-6 text-blue-500" /> */}
        Epoch Countdown (Y2038 Problem)
      </h1>

      {/* Main Countdown Display */}
      <div className="border-2 border-gray-300 dark:border-gray-700 rounded-lg p-4 sm:p-6 mb-6 bg-gray-50 dark:bg-gray-800 overflow-hidden">
        {targetDate && (
          <div className="text-center space-y-4">
            <div className="text-base sm:text-lg font-medium text-gray-700 dark:text-gray-300 break-words px-1">
              {formatDateTimeString(targetDate, true).replace(" UTC", " GMT")}
            </div>
            <div className="text-xl sm:text-3xl md:text-5xl lg:text-7xl font-bold text-gray-900 dark:text-white font-mono break-all overflow-wrap-anywhere px-1 min-w-0">
              {formatCountdown(countdown)}
            </div>
            <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 italic break-words px-1">
              {getCountdownLabel(countdown)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Countdown;
