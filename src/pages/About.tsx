import { Link } from 'react-router-dom';

export const About = () => {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-800 p-6 transition-colors">
      <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">About Epoch Converter</h1>
      <p className="text-gray-700 dark:text-gray-300">
        Epoch Converter is a fast, privacy-friendly tool to convert Unix timestamps
        to human-readable dates and back. It also includes utilities like a live
        epoch clock and handy code snippets for working with timestamps in popular
        languages.
      </p>

      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mt-8 mb-2">Why this project?</h2>
      <p className="text-gray-700 dark:text-gray-300">
        Time handling is deceptively tricky. This app aims to be a clean and
        reliable companion for developers and analysts who work with timestamps
        daily—without ads, tracking, or clutter.
      </p>

      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mt-8 mb-2">Key features</h2>
      <ul className="list-disc pl-6 space-y-1 text-gray-700 dark:text-gray-300">
        <li>Convert between Unix epoch and readable dates</li>
        <li>Support for seconds and milliseconds</li>
        <li>Live epoch clock</li>
        <li>Copy-to-clipboard with one click</li>
        <li>Light/Dark theme with quick toggle</li>
      </ul>

      <div className="mt-8">
        <Link to="/" className="text-blue-600 dark:text-blue-400 hover:underline">
          ← Back to Home
        </Link>
      </div>
    </div>
  );
};

export default About;


