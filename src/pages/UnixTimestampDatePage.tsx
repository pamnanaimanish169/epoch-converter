import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { PSEO_DAILY_DATES } from '../data/pseoDates';
import {
  formatHumanDate,
  getDaysAhead,
  getDaysAheadFromReference,
  getSeasonalUseCase,
  getTimezoneRows,
  getUnixSeconds,
  getWeekdayHint,
  isValidIsoDate,
} from '../utils/pseoDateUtils';

interface UnixTimestampDatePageProps {
  onCopy: (text: string) => void;
}

const dateSet = new Set(PSEO_DAILY_DATES.map((d) => d.date));

export const UnixTimestampDatePage = ({ onCopy }: UnixTimestampDatePageProps) => {
  const { date } = useParams<{ date: string }>();
  const [daysAheadLive, setDaysAheadLive] = useState<number | null>(null);

  const isValid = Boolean(date && isValidIsoDate(date) && dateSet.has(date));
  const epochSeconds = isValid && date ? getUnixSeconds(date) : 0;
  const rows = useMemo(() => (isValid ? getTimezoneRows(epochSeconds) : []), [isValid, epochSeconds]);

  useEffect(() => {
    if (!isValid || !date) return;
    const refresh = () => setDaysAheadLive(getDaysAhead(date));
    refresh();
    const id = window.setInterval(refresh, 60 * 1000);
    return () => window.clearInterval(id);
  }, [date, isValid]);

  if (!isValid || !date) {
    return (
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-800 p-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Unix Timestamp Date Page Not Found</h1>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          This pSEO date page is not in the active future priority set. Use the monthly hub pages to browse available dates.
        </p>
        <Link className="text-blue-600 dark:text-blue-400 hover:underline" to="/unix-timestamps/2026-12">
          Go to December 2026 Hub
        </Link>
      </div>
    );
  }

  const humanDate = formatHumanDate(date);
  const shortHumanDate = new Date(`${date}T00:00:00Z`).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  });
  const weekdayHint = getWeekdayHint(date);
  const seasonalUseCase = getSeasonalUseCase(date);
  const aheadFromRef = getDaysAheadFromReference(date);
  const queryMatch = `unix timestamp for ${humanDate.toLowerCase()}`;
  const monthHub = date.slice(0, 7);
  const liveAhead = daysAheadLive ?? getDaysAhead(date);
  const millis = epochSeconds * 1000;
  const [, month, day] = date.split('-').map(Number);
  const cronExpr = `0 0 ${day} ${month} *`;
  const monthStartDate = `${date.slice(0, 8)}01`;
  const monthStartEpoch = getUnixSeconds(monthStartDate);
  const month25Date = `${date.slice(0, 8)}25`;
  const month25Epoch = getUnixSeconds(month25Date);
  const monthEndDate = (() => {
    const d = new Date(`${date}T00:00:00Z`);
    const end = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth() + 1, 0));
    return `${end.getUTCFullYear()}-${String(end.getUTCMonth() + 1).padStart(2, '0')}-${String(end.getUTCDate()).padStart(2, '0')}`;
  })();
  const monthEndEpoch = getUnixSeconds(monthEndDate);

  const jsSnippet = `const targetDate = "${date}T00:00:00Z";\nconst unixSeconds = Math.floor(Date.parse(targetDate) / 1000);\nconsole.log(unixSeconds); // ${epochSeconds}`;
  const pySnippet = `from datetime import datetime, timezone\n\ndt = datetime.fromisoformat("${date}T00:00:00+00:00")\nprint(int(dt.timestamp()))  # ${epochSeconds}`;

  return (
    <article className="bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-800 p-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
        {shortHumanDate} Unix timestamp? <code className="text-lg">{epochSeconds}</code>. UTC midnight. Done.
      </h1>
      <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
        Snag it and bounce if you are in a rush. If you are juggling release calendars across timezones, this page gives you the one number everyone can trust.
      </p>

      <section className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">The Chaos You Are Dodging</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-3 leading-relaxed">
          Picture this: {liveAhead} days from now. It lands on <strong className="text-gray-900 dark:text-white">{weekdayHint}</strong>. Seasonal load is up, campaigns are noisy, and everyone thinks their timezone is the right one.
          The timestamp <code>{epochSeconds}</code> cuts through that noise and keeps product, engineering, and ops aligned.
        </p>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Quick Facts (Forward-Focused)</h3>
        <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
          <li>Unix timestamp: <strong className="text-gray-900 dark:text-white">{epochSeconds}</strong></li>
          <li>Days from Mar 25 2026 reference: <strong className="text-gray-900 dark:text-white">{aheadFromRef} days ahead</strong></li>
          <li>Days from today (live): <strong className="text-gray-900 dark:text-white">{liveAhead}</strong></li>
          <li>Weekday: <strong className="text-gray-900 dark:text-white">{weekdayHint}</strong></li>
          <li>Use cases: Ideal for <strong className="text-gray-900 dark:text-white">{seasonalUseCase}</strong></li>
          <li>Query match target: <strong className="text-gray-900 dark:text-white">{queryMatch}</strong></li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">How It Lands Worldwide</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-3 leading-relaxed">
          UTC midnight does not feel the same everywhere. One team is logging off, another is waking up. Share this table in your release thread and avoid clock confusion.
        </p>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm border border-gray-200 dark:border-gray-700">
            <thead className="bg-gray-100 dark:bg-gray-800">
              <tr>
                <th className="text-left px-3 py-2 text-gray-900 dark:text-white">Timezone</th>
                <th className="text-left px-3 py-2 text-gray-900 dark:text-white">Local Time</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.label} className="border-t border-gray-200 dark:border-gray-700">
                  <td className="px-3 py-2 text-gray-700 dark:text-gray-300">{row.label}</td>
                  <td className="px-3 py-2 text-gray-700 dark:text-gray-300">{row.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Code? Copy, Paste, Ship</h2>
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-gray-900 dark:text-white">JavaScript</h3>
              <button
                onClick={() => onCopy(jsSnippet)}
                className="px-3 py-1 text-sm bg-gray-200 dark:bg-gray-700 rounded border border-gray-300 dark:border-gray-600"
              >
                Copy
              </button>
            </div>
            <pre className="bg-gray-50 dark:bg-gray-800 p-3 rounded text-sm overflow-x-auto text-gray-800 dark:text-gray-200">
              <code>{jsSnippet}</code>
            </pre>
          </div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-gray-900 dark:text-white">Python</h3>
              <button
                onClick={() => onCopy(pySnippet)}
                className="px-3 py-1 text-sm bg-gray-200 dark:bg-gray-700 rounded border border-gray-300 dark:border-gray-600"
              >
                Copy
              </button>
            </div>
            <pre className="bg-gray-50 dark:bg-gray-800 p-3 rounded text-sm overflow-x-auto text-gray-800 dark:text-gray-200">
              <code>{pySnippet}</code>
            </pre>
          </div>
        </div>
      </section>

      <section className="mb-6 text-gray-700 dark:text-gray-300 space-y-4 leading-relaxed">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Why This Fixes Real Release Pain</h2>
        <p>
          Most teams search future timestamps because something important is about to ship. A plain date string can mean different things in different regions, but an epoch integer means exactly one moment.
          For {humanDate}, that anchor is <code>{epochSeconds}</code>. Put it in tickets, docs, cron jobs, and dashboards so there is no room for timezone interpretation.
        </p>
        <p>
          This helps where it hurts most: deterministic tests, stable automation, cleaner logs, and faster incident debugging. You avoid the "my local clock vs your local clock" loop,
          and your team gets one source of truth for planning windows. That is especially valuable in high-pressure months where release timing and campaign timing overlap.
        </p>
        <p>
          If you have ever lost hours on a deployment because different teams assumed different clocks, this is the antidote. Share the timestamp, align the table, run the same checks in every environment,
          and move on. Future you will thank present you.
        </p>
      </section>

      <section className="mb-6 text-gray-700 dark:text-gray-300">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Nearby Dates ({date.slice(0, 7)} edition)</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>{monthStartDate}: <code>{monthStartEpoch}</code></li>
          <li>{month25Date}: <code>{month25Epoch}</code></li>
          <li>{monthEndDate}: <code>{monthEndEpoch}</code></li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Quick Hits on Common Doubts</h2>
        <div className="space-y-3 text-gray-700 dark:text-gray-300">
          <p><strong className="text-gray-900 dark:text-white">UTC locked?</strong> Yes. {date} 00:00:00Z.</p>
          <p><strong className="text-gray-900 dark:text-white">Cron it?</strong> Use <code>{cronExpr}</code> for calendar scheduling.</p>
          <p><strong className="text-gray-900 dark:text-white">Need milliseconds?</strong> <code>{millis}</code></p>
          <p><strong className="text-gray-900 dark:text-white">Why track days ahead live?</strong> The counter updates client-side so this future page stays accurate over time.</p>
        </div>
      </section>

      <nav className="pt-4 border-t border-gray-200 dark:border-gray-700 text-sm">
        <Link className="text-blue-600 dark:text-blue-400 hover:underline mr-4" to={`/unix-timestamps/${monthHub}`}>
          Browse {monthHub} hub
        </Link>
        <Link className="text-blue-600 dark:text-blue-400 hover:underline" to="/">
          Open main converter
        </Link>
      </nav>
    </article>
  );
};

export default UnixTimestampDatePage;
