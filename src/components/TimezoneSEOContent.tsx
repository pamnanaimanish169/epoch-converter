import { Link } from 'react-router-dom';
import { TimezoneConfig, getRelatedTimezones } from '../utils/timezoneConfig';
import {
  generateIntroduction,
  generateCodeExamples,
  generateScenarios,
  generateCommonIssues
} from '../utils/timezoneUtils';

interface TimezoneSEOContentProps {
  timezoneConfig: TimezoneConfig;
}

export const TimezoneSEOContent = ({ timezoneConfig }: TimezoneSEOContentProps) => {
  const introduction = generateIntroduction(timezoneConfig);
  const codeExamples = generateCodeExamples(timezoneConfig);
  const scenarios = generateScenarios(timezoneConfig);
  const commonIssues = generateCommonIssues(timezoneConfig);
  const relatedTimezones = getRelatedTimezones(timezoneConfig.code, 5);

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-800 p-6 transition-colors">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Epoch to {timezoneConfig.code} Converter - Convert Unix Timestamps to {timezoneConfig.fullName}
      </h1>

      <div className="space-y-6 text-gray-700 dark:text-gray-300">
        {/* Introduction Section */}
        <section>
          <p className="mb-4 leading-relaxed text-lg">
            {introduction}
          </p>
        </section>

        {/* Technical Implementation Section */}
        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Technical Implementation: Converting Epoch to {timezoneConfig.code}
          </h2>
          <p className="mb-4 leading-relaxed">
            Language-specific approaches to epoch conversion for {timezoneConfig.code}:
          </p>

          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Python</h3>
              <pre className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm">
                <code>{codeExamples.python}</code>
              </pre>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">JavaScript</h3>
              <pre className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm">
                <code>{codeExamples.javascript}</code>
              </pre>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">SQL</h3>
              <pre className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm">
                <code>{codeExamples.sql}</code>
              </pre>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Excel</h3>
              <pre className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm">
                <code>{codeExamples.excel}</code>
              </pre>
            </div>
          </div>
        </section>

        {/* Real-World Scenarios Section */}
        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Real-World Scenarios: Using Epoch to {timezoneConfig.code} Conversion
          </h2>
          <div className="space-y-4">
            {scenarios.map((scenario, idx) => (
              <p key={idx} className="leading-relaxed">
                {scenario}
              </p>
            ))}
          </div>
        </section>

        {/* Common Issues Section */}
        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Common Issues and Troubleshooting: {timezoneConfig.code} Conversion Gotchas
          </h2>
          <div className="space-y-3">
            {commonIssues.map((issue, idx) => (
              <div key={idx} className="flex items-start gap-2">
                <span className="text-blue-500 mt-1">•</span>
                <p className="leading-relaxed">{issue}</p>
              </div>
            ))}
          </div>
        </section>

        {/* DST Information */}
        {timezoneConfig.observesDST && (
          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Daylight Saving Time (DST) in {timezoneConfig.code}
            </h2>
            <p className="mb-4 leading-relaxed">
              {timezoneConfig.dstNotes}. When converting epoch timestamps to {timezoneConfig.code}, 
              you must account for the transition to {timezoneConfig.dstCode} during daylight saving period. 
              Your conversion logic should check the date and apply the correct offset based on whether DST is active.
            </p>
            <p className="leading-relaxed">
              <strong className="text-gray-900 dark:text-white">Best Practice:</strong> Use IANA timezone 
              identifiers like <code className="px-1 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-sm">
                {timezoneConfig.ianaName}
              </code> in your code rather than hardcoding offsets. This ensures automatic DST handling.
            </p>
          </section>
        )}

        {!timezoneConfig.observesDST && (
          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              No Daylight Saving Time in {timezoneConfig.code}
            </h2>
            <p className="mb-4 leading-relaxed">
              {timezoneConfig.dstNotes}. Unlike timezones like EST/EDT or PST/PDT, {timezoneConfig.code} 
              maintains a constant offset of {timezoneConfig.utcOffset} from UTC year-round. This means 
              your conversion logic can skip DST checks entirely when working with {timezoneConfig.code}.
            </p>
            <p className="leading-relaxed">
              <strong className="text-gray-900 dark:text-white">Advantage:</strong> The constant offset 
              simplifies epoch to {timezoneConfig.code} conversion—you don't need to worry about spring 
              forward or fall back dates that complicate other timezone conversions.
            </p>
          </section>
        )}

        {/* Geographic Coverage */}
        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Geographic Coverage: Where {timezoneConfig.code} Applies
          </h2>
          <p className="mb-4 leading-relaxed">
            {timezoneConfig.geographicCoverage}. {timezoneConfig.code} is used in {timezoneConfig.regions.join(', ')}.
          </p>
          {timezoneConfig.culturalContext && (
            <p className="leading-relaxed">
              <strong className="text-gray-900 dark:text-white">Cultural Context:</strong> {timezoneConfig.culturalContext}
            </p>
          )}
        </section>

        {/* Related Timezones */}
        {relatedTimezones.length > 0 && (
          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Related Timezone Converters
            </h2>
            <p className="mb-4 leading-relaxed">
              If you need to convert epoch timestamps to other timezones, check out these related converters:
            </p>
            <ul className="space-y-2 list-disc list-inside ml-2">
              {relatedTimezones.map((tz) => (
                <li key={tz.code}>
                  <Link
                    to={`/epoch-to-${tz.code.toLowerCase()}`}
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    Epoch to {tz.code} Converter
                  </Link>
                  {' - '}
                  {tz.fullName}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Footer */}
        <section className="pt-4 border-t border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-600 dark:text-gray-400 italic">
            This epoch to {timezoneConfig.code} converter is part of Epoch Tools, providing accurate 
            timezone-aware timestamp conversion for developers worldwide. Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}.
          </p>
        </section>
      </div>
    </div>
  );
};

