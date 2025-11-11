import { Link } from 'react-router-dom';

export const FAQ = () => {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-800 p-6 transition-colors">
      <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Frequently Asked Questions</h1>

      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mt-6 mb-1">What is an epoch time converter and how do I use it?</h3>
      <p className="text-gray-700 dark:text-gray-300">
        An{' '}
        <a
          href="https://epoch-tools.com/"
          className="text-blue-600 dark:text-blue-400 hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          epoch time converter
        </a>{' '}
        is a tool that helps you convert Unix timestamp (also called <a
          href="https://en.wikipedia.org/wiki/Epoch_(computing)"
          className="text-blue-600 dark:text-blue-400 hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          epoch time
        </a>) into readable dates or times, and vice versa. Just enter your value to instantly see the result in your local time zone or UTC.
      </p>

      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mt-6 mb-1">How do I convert a timestamp to date?</h3>
      <p className="text-gray-700 dark:text-gray-300">
        Just paste your timestamp (be it in seconds, milliseconds, microseconds, or nanoseconds) into the
        {' '}
        <a
          href="https://epoch-tools.com/"
          className="text-blue-600 dark:text-blue-400 hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          timestamp to date converter
        </a>{' '}
        , and instantly get a human-readable date and time for logging, APIs, or debugging outputs. It's that easy.
      </p>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mt-6 mb-1">What is epoch time?</h3>
      <p className="text-gray-700 dark:text-gray-300">
        <a
          href="https://en.wikipedia.org/wiki/Unix_time"
          className="text-blue-600 dark:text-blue-400 hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          Epoch time
        </a>
        , often called Unix time/timestamp, is the count of elapsed seconds since 00:00:00 Coordinated Universal Time on 1 January 1970, excluding leap seconds; it provides a simple numeric representation of time for computers and APIs.
      </p>

      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mt-6 mb-1">What’s the difference between epoch time and Unix time?</h3>
      <p className="text-gray-700 dark:text-gray-300">
        Both{' '}
        <a
          href="https://en.wikipedia.org/wiki/Epoch_(computing)"
          className="text-blue-600 dark:text-blue-400 hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          epoch time
        </a>
        {' '}and{' '}
        <a
          href="https://en.wikipedia.org/wiki/Unix_time"
          className="text-blue-600 dark:text-blue-400 hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          Unix time
        </a>
        {' '}refer to the same system, counting seconds since January 1, 1970 UTC (i.e. Unix epoch or the Epoch time); you can use a unix timestamp converter or epoch time converter for identical results.
      </p>

      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mt-6 mb-1">How can I convert milliseconds to date and what is “current millis”?</h3>
      <p className="text-gray-700 dark:text-gray-300">
        Use the{' '}
        <a
          href="https://epoch-tools.com/"
          className="text-blue-600 dark:text-blue-400 hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          unix timestamp converter
        </a>
        {' '}for timestamps in milliseconds (13 digits); you can also check the current millis counter to get the exact epoch time in milliseconds right now—useful for programming and event logs.
      </p>

      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mt-6 mb-1">What is ISO 8601 format?</h3>
      <p className="text-gray-700 dark:text-gray-300">
        <a
          href="https://en.wikipedia.org/wiki/Unix_time"
          className="text-blue-600 dark:text-blue-400 hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          ISO 8601 {' '}
        </a>
        is an international standard for writing dates and times using unambiguous, machine‑readable strings like 2025‑11‑05T10:27:11Z (UTC), supporting time zones and precise timestamps for reliable data exchange in software systems.
      </p>

      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mt-6 mb-1">How do I convert epoch time to ISO 8601 format?</h3>
      <p className="text-gray-700 dark:text-gray-300">
        Just select
        {' '}
        <a
          href="https://epoch-tools.com/"
          className="text-blue-600 dark:text-blue-400 hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          epoch to ISO 8601 tool
        </a>
        {' '}
        , paste your Unix timestamp, and you’ll get an output like “2025-11-05T10:27:11Z” ready for use in APIs, webhooks, or any international data standards.
      </p>

      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mt-6 mb-1">How do I convert a date or time to epoch (Unix timestamp)?</h3>
      <p className="text-gray-700 dark:text-gray-300">
        Enter any date and time in standard or ISO formats, and the{' '}
        <a
          href="https://epoch-tools.com/"
          className="text-blue-600 dark:text-blue-400 hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          unix timestamp converter
        </a>
        {' '}will instantly provide you with the Unix timestamp in seconds, milliseconds, or your chosen unit.
      </p>


      <div className="mt-8">
        <Link to="/" className="text-blue-600 dark:text-blue-400 hover:underline">
          ← Back to Home
        </Link>
      </div>
    </div>
  );
};

export default FAQ;


