import { Link } from 'react-router-dom';

export const About = () => {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-800 p-6 transition-colors">
      <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">What we do?</h1>
      <p className="text-gray-700 dark:text-gray-300">
        <a href="https://www.iana.org/time-zones" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">Epoch Tools </a>
        is a fast, privacy-first epoch time converter and unix timestamp converter that turns raw timestamps into clear, readable dates. It also lets you convert timestamp to date, convert date back to epoch, and format results for APIs in seconds.
      </p>

      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mt-8 mb-2">Built for clarity</h2>
      <p className="text-gray-700 dark:text-gray-300">
        Whether you have seconds, milliseconds, microseconds, or nanoseconds, the epoch time converter detects the right precision so milliseconds to date is as effortless as seconds to date. Dedicated tools cover date to epoch, epoch to date, and epoch to
        <a href="https://en.wikipedia.org/wiki/ISO_8601" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline"> ISO 8601 </a>
        for standards‑compliant outputs.
      </p>

      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mt-8 mb-2">Standards we follow</h2>
      <p className="text-gray-700 dark:text-gray-300">
        <a href="https://en.wikipedia.org/wiki/Unix_time" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">Unix time</a> represents the number of seconds elapsed since the Unix epoch, a widely used baseline in computing for logging and data interchange.
        {' '}For interoperable strings, outputs support <a href="https://en.wikipedia.org/wiki/ISO_8601" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">ISO 8601</a>, including UTC with the "Z" designator and numeric UTC offsets like +05:30, which makes integration with APIs and webhooks straightforward.
      </p>

      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mt-8 mb-2">Time zones that just work</h2>
      <p className="text-gray-700 dark:text-gray-300">

        The site supports all IANA time zones <a href="https://www.iana.org/time-zones" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">(tz database)</a>, so you can render timestamps in precise regions like America/New York, Europe/London, Asia/Kolkata, or Australia/Sydney with correct
        daylight saving rules.
        {' '}Under the hood, conversions normalize to UTC and then format in your selected zone, ensuring consistency across <a href="https://www.iana.org/time-zones" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">locales</a> and environments.
      </p>

      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mt-8 mb-2">Private by design, fast by default</h2>
      <p className="text-gray-700 dark:text-gray-300">
        Conversions run in the browser for speed and privacy, so your data doesn't leave your device. The UI stays minimal, with instant copy buttons, keyboard shortcuts, and accessible color contrast for uninterrupted workflows.
      </p>

      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mt-8 mb-2">Developer‑friendly features</h2>
      <ul className="text-gray-700 dark:text-gray-300 list-disc list-inside space-y-2">
        <li>Copy‑ready snippets to drop into scripts and docs for your convenience.</li>
        <li>A lightweight user interface for epoch to date and date to epoch when you need it the most.</li>
        <li>Flexible formatting presets: 
        epoch to <a href="https://en.wikipedia.org/wiki/ISO_8601" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">ISO 8601</a>,
          <a href="https://datatracker.ietf.org/doc/html/rfc3339" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline"> RFC 3339</a>
          , and localized date/time outputs. </li>
      </ul>

      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mt-8 mb-2">Why we built this?</h2>
      <p className="text-gray-700 dark:text-gray-300">
        Time data should be simple. Instead of wrestling with off‑by‑one‑hour bugs or unit confusion,
        <a href="https://epoch-tools.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline"> Epoch Tools </a>
        gives you a clean set of utilities like epoch time converter, unix timestamp converter, timestamp to date, and milliseconds to date that are accurate, fast, and easy to integrate.
      </p>

      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mt-8 mb-2">What's next?</h2>
      <p className="text-gray-700 dark:text-gray-300">
        Upcoming utilities include week number today, date/time difference, hex timestamp converter, bulk conversions, and richer localization options. If a feature would save you time, suggest it. We iterate quickly.
      </p>

      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mt-8 mb-2">Who we are?</h2>
      <p className="text-gray-700 dark:text-gray-300">
        <a href="https://epoch-tools.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">Epoch Tools</a> or unix timestamp converter is crafted by an indie builder focused on small, reliable developer utilities. The goal: eliminate time formatting friction so you can ship faster.
      </p>

      {/* TODO: Create a professional looking email address to put in contact us */}
      {/* <h2 className="text-lg font-semibold text-gray-900 dark:text-white mt-8 mb-2">Get in touch</h2>
      <p className="text-gray-700 dark:text-gray-300">
        Questions, bugs, or feature ideas? Reach out via the contact page and include a sample timestamp and preferred format (for example, epoch to ISO 8601 in UTC) so it's easy to help.
      </p> */}

      <div className="mt-8">
        <Link to="/" className="text-blue-600 dark:text-blue-400 hover:underline">
          ← Back to Home
        </Link>
      </div>
    </div>
  );
};

export default About;


