import { BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

export const ConverterSectionSEOContent = () => {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-800 p-6 transition-colors">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
        <BookOpen className="w-6 h-6 text-blue-500" />
        Free Online Unix Timestamp Converter (Seconds & Milliseconds)
      </h1>

      <div className="space-y-6 text-gray-700 dark:text-gray-300">
        <section>
          <p className="mb-4 leading-relaxed">
            Convert Unix timestamps (epoch time) to human-readable dates instantly, accurately and reliably. Our tools auto-detects seconds, milliseconds, microseconds while asjusting for DST (Daylight Saving Time) variations.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            What is Unix Timestamp / Epoch Time?
          </h2>
          <p className="mb-4 leading-relaxed">
            Unix timestamp, popularly also known as epoch time, represents the number of <strong className="text-gray-900 dark:text-white">seconds</strong> (or milliseconds) elapsed since <strong className="text-gray-900 dark:text-white">January 1, 1970, 00:00:00 UTC</strong> (the Unix epoch). This consistent format powers most modern applications bec because it's:
          </p>
          <ul className="space-y-2 list-disc list-inside ml-2 mb-4">
            <li><strong className="text-gray-900 dark:text-white">Compact</strong>: Single integer (e.g., <code className="px-1 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-sm">1733832800</code>) vs long and expansive strings</li>
            <li><strong className="text-gray-900 dark:text-white">Sortable</strong>: Naturally ordered by chronology</li>
            <li><strong className="text-gray-900 dark:text-white">Timezone-agnostic</strong>: UTC-based mostly to avoid locale specific confusion.</li>
            <li><strong className="text-gray-900 dark:text-white">Universal</strong>: Supported by every popular programming language and databases</li>
          </ul>
          <p className="mb-4 leading-relaxed">
            <strong className="text-gray-900 dark:text-white">Example</strong>: <code className="px-1 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-sm">1733832800</code> = <strong className="text-gray-900 dark:text-white">December 10, 2025, 00:00:00 UTC</strong><br />
            <strong className="text-gray-900 dark:text-white">In IST</strong>: December 10, 2025, 05:30:00 (+5:30 offset)
          </p>
          <p className="mb-4 leading-relaxed">
            <strong className="text-gray-900 dark:text-white">Precision variants</strong>:
          </p>
          <pre className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto mb-4 text-sm">
            <code>
              1733832800     = Seconds (Unix standard)
              <br />
              1733832800000  = Milliseconds (JavaScript Date.now())
              <br />
              1733832800000000 = Microseconds (some databases)
              <br />
            </code>
          </pre>
          <p className="leading-relaxed">
            <strong className="text-gray-900 dark:text-white">Paste any epoch value above</strong> to see it converted instantly with timezone support.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Convert Epoch to Human-Readable Date
          </h2>
          <p className="mb-4 leading-relaxed">
            <strong className="text-gray-900 dark:text-white">Our converter handles all formats</strong>:
          </p>
          <ol className="space-y-2 list-decimal list-inside ml-2 mb-4">
            <li><strong className="text-gray-900 dark:text-white">Input</strong>: Paste epoch value (auto-detects seconds vs milliseconds)</li>
            {/* <li><strong className="text-gray-900 dark:text-white">Select</strong>: Target timezone (500+ options: UTC, IST, PST, CET, etc.)</li> */}
            <li><strong className="text-gray-900 dark:text-white">Output</strong>: Human readable date + multiple formats (ISO 8601, RFC 2822, custom)</li>
          </ol>
          <p className="mb-4 leading-relaxed">
            <strong className="text-gray-900 dark:text-white">Live example</strong>:
          </p>
          <pre className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto mb-4 text-sm">
            <code>Input: 1733832800 (seconds)
              <br />
              Output:
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;UTC: 2025-12-10 00:00:00
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;IST: 2025-12-10 05:30:00 (+05:30)
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;PST: 2025-12-09 16:00:00 (-08:00)</code>
          </pre>
          <p className="leading-relaxed">
            <strong className="text-gray-900 dark:text-white">Reverse conversion</strong>: Enter any date → Get reliable Unix timestamp accurately.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Common Developer Use Cases
          </h2>

          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              API Payload Validation
            </h3>
            <p className="mb-4 leading-relaxed">
              <strong className="text-gray-900 dark:text-white">JWT tokens </strong>unlike others use <code className="px-1 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-sm">iat</code> (issued at), <code className="px-1 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-sm">exp</code> (expiration), <code className="px-1 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-sm">nbf</code> (not before) as Unix timestamps. You can validate the claims instantlty and accurately using:
            </p>
            <pre className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto mb-4 text-sm">
              <code>JWT payload: {`{ "exp": 1733919200 }`}
                <br />
                Convert → Dec 11, 2025 00:00:00 UTC ✓ Valid (future)</code>
            </pre>
            <p className="mb-4 leading-relaxed">
              <strong className="text-gray-900 dark:text-white">REST APIs</strong> with custom timestamp fields:
            </p>
            <pre className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto mb-4 text-sm">
              <code>{`{
  "created_at": 1733832800,  
  "updated_at": 1733836400
}`}</code>
            </pre>
            <p className="mb-4 leading-relaxed">
              Spot issues: Is <code className="px-1 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-sm">created_at</code> older than <code className="px-1 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-sm">updated_at</code>? Correct timezone? Seconds vs ms?
            </p>
            <p className="mb-4 leading-relaxed">
              <strong className="text-gray-900 dark:text-white">Copy-paste validation</strong>:
            </p>
            <pre className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto mb-4 text-sm">
              <code>{`// Validate API response
const timestamp = 1733832800;
const date = new Date(timestamp * 1000); // Convert seconds to ms
console.log(date.toISOString()); // 2025-12-10T00:00:00.000Z`}</code>
            </pre>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              Database Timestamp Storage
            </h3>
            <p className="mb-4 leading-relaxed">
              <strong className="text-gray-900 dark:text-white">MySQL</strong>:
            </p>
            <pre className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto mb-4 text-sm">
              <code>{`-- Store as Unix timestamp (INT)
INSERT INTO events (timestamp) VALUES (1733832800);

-- Convert back
SELECT FROM_UNIXTIME(timestamp) FROM events;`}</code>
            </pre>
            <p className="mb-4 leading-relaxed">
              <strong className="text-gray-900 dark:text-white">PostgreSQL</strong>:
            </p>
            <pre className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto mb-4 text-sm">
              <code>{`-- TIMESTAMPTZ stores UTC
INSERT INTO logs (event_time) VALUES ('2025-12-10 00:00:00'::timestamptz);

-- Extract epoch
SELECT EXTRACT(EPOCH FROM event_time)::bigint;`}</code>
            </pre>
            <p className="mb-4 leading-relaxed">
              <strong className="text-gray-900 dark:text-white">Common errors fixed</strong>:
            </p>
            <ul className="space-y-2 list-disc list-inside ml-2 mb-4">
              <li>Mixing <code className="px-1 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-sm">TIMESTAMP</code> (no TZ) vs <code className="px-1 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-sm">TIMESTAMPTZ</code> (UTC)</li>
              <li>Seconds vs milliseconds storage</li>
              <li>Regional server time vs UTC normalization
              </li>
            </ul>
            <p className="leading-relaxed">
              <strong className="text-gray-900 dark:text-white">Use our converter</strong> to generate correct <code className="px-1 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-sm">INSERT</code> values and debug <code className="px-1 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-sm">SELECT</code> queries.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Timezone & DST Handling
          </h2>
          <p className="mb-4 leading-relaxed">
            <strong className="text-gray-900 dark:text-white">India Standard Time (IST)</strong>: Fixed <strong className="text-gray-900 dark:text-white">+05:30</strong> offset (no DST since 1945)<br />
            <strong className="text-gray-900 dark:text-white">Pacific Time (PST/PDT)</strong>: Switches <strong className="text-gray-900 dark:text-white">-08:00 → -07:00</strong> during DST
          </p>
          <p className="mb-4 leading-relaxed">
            <strong className="text-gray-900 dark:text-white">Example DST impact</strong>:
          </p>
          <pre className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto mb-4 text-sm">
            <code>Epoch: 1640995200 (Jan 1, 2022)
              <br />
              PST: 2021-12-31 16:00:00 (-08:00, no DST)
              <br />
PDT: 2021-12-31 17:00:00 (-07:00, DST active)</code>
          </pre>
          <p className="mb-4 leading-relaxed">
            <strong className="text-gray-900 dark:text-white">Production debugging</strong>:
          </p>
          <ol className="space-y-2 list-decimal list-inside ml-2 mb-4">
            <li><strong className="text-gray-900 dark:text-white">Paste log timestamp</strong></li>
            <li><strong className="text-gray-900 dark:text-white">Select investigator's timezone</strong></li>
            <li><strong className="text-gray-900 dark:text-white">See exact local time</strong> → Faster incident correlation</li>
          </ol>
          <p className="mb-4 leading-relaxed">
            <strong className="text-gray-900 dark:text-white">Code fix</strong> (Node.js):
          </p>
          <pre className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto mb-4 text-sm">
            <code>{`// Wrong: Local time
const local = Date.now();

// Correct: UTC epoch (seconds)
const utcEpoch = Math.floor(Date.now() / 1000);`}</code>
          </pre>
          <p className="leading-relaxed">
            Our tool catches time inconsistencies by making<strong className="text-gray-900 dark:text-white"> side-by-side comparisons </strong> in realtime.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            <div>
              <p className="mb-2 leading-relaxed">
                <strong className="text-gray-900 dark:text-white">What timezone does Unix timestamp use?</strong><br />
                Always <strong className="text-gray-900 dark:text-white">UTC</strong>. The epoch counts seconds since January 1 1970 00:00:00 UTC regardless of what the server or client location is.
              </p>
            </div>
            <div>
              <p className="mb-2 leading-relaxed">
                <strong className="text-gray-900 dark:text-white">Seconds or milliseconds?</strong><br />   
                  &bull;&nbsp;&nbsp;&nbsp;&nbsp;<strong className="text-gray-900 dark:text-white">Seconds</strong>: Unix standard (<code className="px-1 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-sm">date +%s</code>), APIs, databases<br />
                  &bull;&nbsp;&nbsp;&nbsp;&nbsp;<strong className="text-gray-900 dark:text-white">Milliseconds</strong>: JavaScript (<code className="px-1 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-sm">Date.now()</code>), some logs<br />
                <strong className="text-gray-900 dark:text-white">Our tool auto-detects</strong> based on value range saving your precious time and resources.
              </p>
            </div>
            <div>
              <p className="mb-2 leading-relaxed">
                <strong className="text-gray-900 dark:text-white">Will it work after Year 2038?</strong><br />
                <strong className="text-gray-900 dark:text-white">The Y2038 problem </strong> only affects the older 32-bit systems which causes them to overflow after Jan 19, 2038 03:14:07 UTC exactly. <strong className="text-gray-900 dark:text-white">Modern day 64-bit systems</strong> solves this problem and handles the timestamp till the year 292 billion.
              </p>
            </div>
            <div>
              <p className="mb-2 leading-relaxed">
                <strong className="text-gray-900 dark:text-white">Is it safe for production data?</strong><br />
                We convert the epoch timestamp <strong className="text-gray-900 dark:text-white">100% at the client-side</strong> which leaves No data in your browser.
              </p>
            </div>
            <div>
              <p className="mb-2 leading-relaxed">
                <strong className="text-gray-900 dark:text-white">Free forever?</strong><br />
                <strong className="text-gray-900 dark:text-white">Yes</strong>. No signups, no limits, ad-supported.
              </p>
            </div>
            <div>
              <p className="mb-2 leading-relaxed">
                <strong className="text-gray-900 dark:text-white">Related tools</strong>: <Link to="/" className="text-blue-600 dark:text-blue-400 hover:underline">Unix Timestamp ↔ Date Converter</Link> | <Link to="/week-number" className="text-blue-600 dark:text-blue-400 hover:underline">Week Number</Link> | <Link to="/countdown" className="text-blue-600 dark:text-blue-400 hover:underline">Countdown to "Epochalypse" (Y2038)</Link>
              </p>
            </div>
          </div>
        </section>

        <section className="pt-4 border-t border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-600 dark:text-gray-400 italic">
            By Manish Pamnani, Full-Stack Developer | Last Updated: Dec 10, 2025
          </p>
        </section>
      </div>
    </div>
  );
};

