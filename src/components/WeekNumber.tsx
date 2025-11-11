import { useState, useEffect } from 'react';
import { Calendar, Copy } from 'lucide-react';
import { getCurrentWeekNumber } from '../utils/epochUtils';

interface WeekNumberProps {
    onCopy: (text: string) => void;
}

export const WeekNumber = ({ onCopy }: WeekNumberProps) => {
    const [weekNumber, setWeekNumber] = useState(getCurrentWeekNumber());
    const [currentDate, setCurrentDate] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date();
            setCurrentDate(now);
            setWeekNumber(getCurrentWeekNumber());
        }, 1000); // Update every second to handle day changes

        return () => clearInterval(interval);
    }, []);

    const formattedDate = currentDate.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    const weekNumberString = weekNumber.toString();

    return (
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-800 p-6 transition-colors">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-purple-500" />
                Week Number Today
            </h2>

            {/* Above-the-fold answer - Large, prominent display */}
            <div className="mb-8">
                <div className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-xl p-8 border-2 border-purple-200 dark:border-purple-800">
                    <div className="text-center">
                        <p className="text-sm font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-3">
                            Week Number Today
                        </p>
                        <div className="flex items-center justify-center gap-4 mb-4">
                            <p className="text-6xl font-bold text-purple-600 dark:text-purple-400">
                                {weekNumber}
                            </p>
                            <button
                                onClick={() => onCopy(weekNumberString)}
                                className="p-3 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg shadow-md transition-all hover:scale-105 active:scale-95"
                                aria-label="Copy week number"
                                title="Copy week number"
                            >
                                <Copy className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                            </button>
                        </div>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">
                            {formattedDate}
                        </p>
                    </div>
                </div>
            </div>

            {/* Additional information */}
            <div className="space-y-4">
                <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                        <strong className="text-gray-900 dark:text-white">ISO Week Number:</strong> {weekNumber}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-500">
                        Week numbers follow the{' '}
                        <a
                            href="https://www.iso.org/iso-8601-date-and-time-format.html"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-purple-600 dark:text-purple-400 hover:underline"
                        >
                            ISO 8601
                        </a>{' '}
                        standard, where week 1 is the week containing the first Thursday of the year.
                    </p>
                </div>
            </div>
        </div>
    );
};

