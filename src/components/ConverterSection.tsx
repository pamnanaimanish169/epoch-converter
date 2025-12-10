import { useState, useEffect } from 'react';
import { Copy, RefreshCw, Calendar, Clock } from 'lucide-react';
import {
  detectTimeUnit,
  normalizeToMilliseconds,
  convertFromMilliseconds,
  formatDateTimeString,
  parseDateTimeString,
  isValidEpoch,
  cleanEpochInput
} from '../utils/epochUtils';
import { TimeUnit } from '../types';

interface ConverterSectionProps {
  onCopy: (text: string) => void;
}

export const ConverterSection = ({ onCopy }: ConverterSectionProps) => {
  const [epochInput, setEpochInput] = useState<string>('');
  const [dateInput, setDateInput] = useState<string>('');
  const [detectedUnit, setDetectedUnit] = useState<TimeUnit>('seconds');
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (!epochInput) {
      const now = Date.now();
      const seconds = Math.floor(now / 1000);
      setEpochInput(seconds.toString());
    }
  }, []);

  useEffect(() => {
    if (!epochInput) {
      setDateInput('');
      setError('');
      return;
    }

    // Clean the input to remove suffixes and invalid characters
    const cleanedInput = cleanEpochInput(epochInput);
    const numEpoch = parseFloat(cleanedInput);

    if (isNaN(numEpoch)) {
      setError('Invalid epoch value');
      setDateInput('');
      return;
    }

    if (!isValidEpoch(numEpoch)) {
      setError('Epoch value out of valid range (1900-2100)');
      setDateInput('');
      return;
    }

    setError('');
    const unit = detectTimeUnit(numEpoch);
    setDetectedUnit(unit);

    const ms = normalizeToMilliseconds(numEpoch, unit);
    const date = new Date(ms);

    const localDate = formatDateTimeString(date, false);
    setDateInput(localDate);
  }, [epochInput]);

  const handleDateChange = (value: string) => {
    setDateInput(value);

    const ms = parseDateTimeString(value);
    if (ms === null) {
      setError('Invalid date format');
      return;
    }

    setError('');
    const epoch = convertFromMilliseconds(ms, detectedUnit);
    setEpochInput(epoch.toString());
  };

  const handleSetNow = () => {
    const now = Date.now();
    const epoch = convertFromMilliseconds(now, detectedUnit);
    setEpochInput(epoch.toString());
  };

  const getUTCDate = (): string => {
    if (!epochInput || error) return '';
    const cleanedInput = cleanEpochInput(epochInput);
    const numEpoch = parseFloat(cleanedInput);
    
    if (isNaN(numEpoch) || !isValidEpoch(numEpoch)) {
      return '';
    }
    
    const ms = normalizeToMilliseconds(numEpoch, detectedUnit);
    const date = new Date(ms);
    
    // Check if date is valid before formatting
    if (isNaN(date.getTime())) {
      return '';
    }
    
    return formatDateTimeString(date, true);
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-800 p-6 transition-colors">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
        <RefreshCw className="w-5 h-5 text-blue-500" />
        Bi-Directional Converter
      </h2>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Unix Epoch Timestamp
          </label>
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <input
                type="text"
                value={epochInput}
                onChange={(e) => setEpochInput(e.target.value)}
                placeholder="Enter epoch timestamp"
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white transition-colors"
                aria-label="Epoch timestamp input"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                <span className="text-xs font-medium px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded">
                  {detectedUnit}
                </span>
              </div>
            </div>
            <button
              onClick={() => onCopy(epochInput)}
              className="px-4 py-3 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg transition-colors"
              aria-label="Copy epoch timestamp"
            >
              <Copy className="w-5 h-5" />
            </button>
            <button
              onClick={handleSetNow}
              className="px-4 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
              aria-label="Set to current time"
            >
              <Clock className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-700 to-transparent"></div>
          <RefreshCw className="w-4 h-4 text-gray-400" />
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-700 to-transparent"></div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Local Date & Time
          </label>
          <div className="flex gap-2">
            <div className="flex-1">
              <input
                type="text"
                value={dateInput}
                onChange={(e) => handleDateChange(e.target.value)}
                placeholder="YYYY-MM-DD HH:MM:SS"
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white transition-colors"
                aria-label="Local date time input"
              />
            </div>
            <button
              onClick={() => onCopy(dateInput)}
              className="px-4 py-3 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg transition-colors"
              aria-label="Copy local date time"
            >
              <Copy className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div>
          <label className="flex text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 items-center gap-2">
            <Calendar className="w-4 h-4" />
            UTC Date & Time
          </label>
          <div className="flex gap-2">
            <div className="flex-1">
              <input
                type="text"
                value={getUTCDate()}
                readOnly
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white transition-colors cursor-default"
                aria-label="UTC date time output"
              />
            </div>
            <button
              onClick={() => onCopy(getUTCDate())}
              className="px-4 py-3 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg transition-colors"
              aria-label="Copy UTC date time"
            >
              <Copy className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="space-y-4">
          <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <p className="text-xs text-gray-500 dark:text-gray-500">The Unix & Epoch Timestamp Converter converts an epoch/unix timestamp into a human-readable date. This tool also displays the current epoch/unix timestamp in both seconds and milliseconds, and is a valuable resource for anyone working with time-based data.</p>
          </div>
        </div>

        {error && (
          <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
          </div>
        )}
      </div>
    </div>
  );
};
