import { Link, useParams } from 'react-router-dom';
import { PSEO_DAILY_DATES, PSEO_MONTH_HUBS } from '../data/pseoDates';
import { formatHumanDate, getMonthlyDateRange, isValidMonth } from '../utils/pseoDateUtils';

const monthSet = new Set(PSEO_MONTH_HUBS);

export const UnixTimestampMonthHubPage = () => {
  const { month } = useParams<{ month: string }>();
  const isValid = Boolean(month && isValidMonth(month) && monthSet.has(month));

  if (!isValid || !month) {
    return (
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-800 p-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Monthly Unix Timestamp Hub Not Found</h1>
        <p className="text-gray-700 dark:text-gray-300">
          This month hub is outside the generated future range. Try a month between 2026-03 and 2026-12.
        </p>
      </div>
    );
  }

  const { start, end } = getMonthlyDateRange(month);
  const pages = PSEO_DAILY_DATES.filter((d) => d.date >= start && d.date <= end);

  return (
    <article className="bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-800 p-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Unix Timestamps for {month}</h1>
      <p className="text-gray-700 dark:text-gray-300 mb-6">
        Monthly hub for future-date Unix timestamp pages. This cluster helps developers compare planning checkpoints, quarter boundaries, and release windows in one place.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {pages.map((entry) => (
          <Link
            key={entry.date}
            to={`/unix-timestamp/${entry.date}`}
            className="p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-500 transition-colors"
          >
            <div className="font-medium text-gray-900 dark:text-white">{entry.date}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">{formatHumanDate(entry.date)}</div>
          </Link>
        ))}
      </div>

      <nav className="pt-5 mt-5 border-t border-gray-200 dark:border-gray-700 text-sm">
        <Link className="text-blue-600 dark:text-blue-400 hover:underline" to="/">
          Back to converter
        </Link>
      </nav>
    </article>
  );
};

export default UnixTimestampMonthHubPage;
