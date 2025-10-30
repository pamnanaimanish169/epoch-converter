import { Link } from 'react-router-dom';

export const FAQ = () => {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-800 p-6 transition-colors">
      <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Frequently Asked Questions</h1>

      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mt-6 mb-1">What is the Unix epoch?</h3>
      <p className="text-gray-700 dark:text-gray-300">
        The Unix epoch is the point in time 00:00:00 UTC on 1 January 1970.
        Unix timestamps represent the number of seconds (or milliseconds) since
        that moment.
      </p>

      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mt-6 mb-1">Seconds vs milliseconds?</h3>
      <p className="text-gray-700 dark:text-gray-300">
        Many systems use seconds (10 digits), while browsers and some APIs use
        milliseconds (13 digits). This app supports both.
      </p>

      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mt-6 mb-1">Do conversions happen locally?</h3>
      <p className="text-gray-700 dark:text-gray-300">
        Yes. All conversions run entirely in your browser—no timestamps are sent
        to any server.
      </p>

      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mt-6 mb-1">Which time zone is used?</h3>
      <p className="text-gray-700 dark:text-gray-300">
        By default, conversions use your current system time zone unless stated
        otherwise in specific tools.
      </p>

      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mt-6 mb-1">Can I copy results?</h3>
      <p className="text-gray-700 dark:text-gray-300">
        Yes. Use the copy buttons next to results to quickly copy values.
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


