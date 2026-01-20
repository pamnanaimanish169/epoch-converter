import { useState, useEffect } from 'react';
import { Copy, RefreshCw, Clock } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import {
  detectTimeUnit,
  normalizeToMilliseconds,
  convertFromMilliseconds,
  isValidEpoch,
  cleanEpochInput
} from '../utils/epochUtils';
import { TimeUnit } from '../types';
import { convertEpochToTimezone } from '../utils/timezoneUtils';
import { TimezoneConfig } from '../utils/timezoneConfig';

interface TimezoneConverterProps {
  timezoneConfig: TimezoneConfig;
  onCopy: (text: string) => void;
}

export const TimezoneConverter = ({ timezoneConfig, onCopy }: TimezoneConverterProps) => {
  const { t } = useTranslation();
  const [epochInput, setEpochInput] = useState<string>('');
  const [detectedUnit, setDetectedUnit] = useState<TimeUnit>('seconds');
  const [error, setError] = useState<string>('');
  const [timezoneTime, setTimezoneTime] = useState<string>('');
  const [utcTime, setUtcTime] = useState<string>('');

  useEffect(() => {
    if (!epochInput) {
      const now = Date.now();
      const seconds = Math.floor(now / 1000);
      setEpochInput(seconds.toString());
    }
  }, []);

  useEffect(() => {
    if (!epochInput) {
      setTimezoneTime('');
      setUtcTime('');
      setError('');
      return;
    }

    const cleanedInput = cleanEpochInput(epochInput);
    const numEpoch = parseFloat(cleanedInput);

    if (isNaN(numEpoch)) {
      setError(t('converter.error.invalid'));
      setTimezoneTime('');
      setUtcTime('');
      return;
    }

    if (!isValidEpoch(numEpoch)) {
      setError(t('converter.error.outOfRange'));
      setTimezoneTime('');
      setUtcTime('');
      return;
    }

    setError('');
    const unit = detectTimeUnit(numEpoch);
    setDetectedUnit(unit);

    const ms = normalizeToMilliseconds(numEpoch, unit);
    const date = new Date(ms);

    if (isNaN(date.getTime())) {
      setError(t('converter.error.invalid'));
      setTimezoneTime('');
      setUtcTime('');
      return;
    }

    // Convert to target timezone
    const tzTime = convertEpochToTimezone(numEpoch, timezoneConfig.code, unit);
    setTimezoneTime(tzTime);

    // Convert to UTC
    const utcStr = date.toISOString().replace('T', ' ').replace('Z', ' UTC');
    setUtcTime(utcStr);
  }, [epochInput, timezoneConfig.code, t]);

  const handleSetNow = () => {
    const now = Date.now();
    const epoch = convertFromMilliseconds(now, detectedUnit);
    setEpochInput(epoch.toString());
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-800 p-6 transition-colors">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
        <RefreshCw className="w-5 h-5 text-blue-500" />
        Epoch to {timezoneConfig.code} Converter
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
              aria-label="Copy epoch"
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
            {timezoneConfig.fullName} ({timezoneConfig.code})
          </label>
          <div className="flex gap-2">
            <div className="flex-1">
              <input
                type="text"
                value={timezoneTime}
                readOnly
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white transition-colors cursor-default"
                aria-label={`${timezoneConfig.code} time`}
              />
            </div>
            <button
              onClick={() => onCopy(timezoneTime)}
              className="px-4 py-3 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg transition-colors"
              aria-label={`Copy ${timezoneConfig.code} time`}
            >
              <Copy className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            UTC Date & Time
          </label>
          <div className="flex gap-2">
            <div className="flex-1">
              <input
                type="text"
                value={utcTime}
                readOnly
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white transition-colors cursor-default"
                aria-label="UTC time"
              />
            </div>
            <button
              onClick={() => onCopy(utcTime)}
              className="px-4 py-3 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg transition-colors"
              aria-label="Copy UTC time"
            >
              <Copy className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
          <p className="text-sm text-blue-800 dark:text-blue-200">
            <strong>Timezone Info:</strong> {timezoneConfig.fullName} ({timezoneConfig.code}) is {timezoneConfig.utcOffset} from UTC.
            {timezoneConfig.observesDST ? (
              <span> During daylight saving, it switches to {timezoneConfig.dstCode}.</span>
            ) : (
              <span> It does not observe daylight saving time.</span>
            )}
          </p>
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

