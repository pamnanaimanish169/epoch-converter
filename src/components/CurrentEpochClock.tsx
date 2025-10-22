import { useState, useEffect } from 'react';
import { Timer, Copy } from 'lucide-react';
import { getCurrentEpoch } from '../utils/epochUtils';
import { TimeUnit } from '../types';

interface CurrentEpochClockProps {
  onCopy: (text: string) => void;
}

export const CurrentEpochClock = ({ onCopy }: CurrentEpochClockProps) => {
  const [seconds, setSeconds] = useState(getCurrentEpoch('seconds'));
  const [milliseconds, setMilliseconds] = useState(getCurrentEpoch('milliseconds'));
  const [microseconds, setMicroseconds] = useState(getCurrentEpoch('microseconds'));

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(getCurrentEpoch('seconds'));
      setMilliseconds(getCurrentEpoch('milliseconds'));
      setMicroseconds(getCurrentEpoch('microseconds'));
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const units: { label: string; value: number; unit: TimeUnit }[] = [
    { label: 'Seconds', value: seconds, unit: 'seconds' },
    { label: 'Milliseconds', value: milliseconds, unit: 'milliseconds' },
    { label: 'Microseconds', value: microseconds, unit: 'microseconds' }
  ];

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-800 p-6 transition-colors">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
        <Timer className="w-5 h-5 text-green-500" />
        Current Epoch Time
      </h2>

      <div className="space-y-4">
        {units.map(({ label, value, unit }) => (
          <div key={unit} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <div>
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">
                {label}
              </p>
              <p className="text-lg font-mono font-semibold text-gray-900 dark:text-white">
                {value.toLocaleString()}
              </p>
            </div>
            <button
              onClick={() => onCopy(value.toString())}
              className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors"
              aria-label={`Copy ${label}`}
            >
              <Copy className="w-4 h-4 text-gray-600 dark:text-gray-400" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
