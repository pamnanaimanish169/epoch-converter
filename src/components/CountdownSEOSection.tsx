import { Link } from "react-router-dom";

export const CountdownSEOSection = () => {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-800 p-6 transition-colors">
      <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
        Countdown to the Year 2038 Problem (Epochalypse)
      </h2>

      <div className="space-y-6 text-gray-700 dark:text-gray-300">
        <section>
          <p className="mb-4 leading-relaxed">
            Track the live countdown to the{" "}
            <strong className="text-gray-900 dark:text-white">
              Year 2038 (Y2038) problem
            </strong>{" "}
            and see exactly how much time is left until the 32-bit Unix
            timestamps overflow (precisely at{" "}
            <strong className="text-gray-900 dark:text-white">
              January 19, 2038, at 03:14:07 UTC
            </strong>
            ) and start producing incorrect timestamps. This page helps you
            understand this phenomenon, also known as{" "}
            <strong className="text-gray-900 dark:text-white">
              "Epochalypse,"
            </strong>{" "}
            and why it matters.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            What Is the Year 2038 Problem?
          </h2>
          <p className="mb-4 leading-relaxed">
            The Year 2038 (Y2038) Problem, often known as the{" "}
            <strong className="text-gray-900 dark:text-white">
              Epochalypse
            </strong>
            , is a well-known limitation/bug which occurs in the older 32-bit
            systems that store time as a signed 32-bit integer counting the
            seconds since the epoch time, i.e.,{" "}
            <strong className="text-gray-900 dark:text-white">
              January 1 1970 00:00:00 UTC
            </strong>
            . The maximum positive value for such systems is 2,147,483,647
            seconds. When the clock reaches the date{" "}
            <strong className="text-gray-900 dark:text-white">
              19 January 2038, 03:14:07 UTC
            </strong>
            , the 32-bit integer has reached its limits and thus unsurprisingly
            "rolls over" into the negative range. The affected systems interpret
            the date as{" "}
            <strong className="text-gray-900 dark:text-white">
              13 December 1901
            </strong>{" "}
            or another nonsensical historical date, depending on how the
            affected software interprets the value.
          </p>
          <p className="leading-relaxed">
            This overflow often breaks the applications and systems designed to
            rely on Unix time for different use cases like scheduling, logging,
            databases, or embedded systems if they don't upgrade to the modern
            64-bit systems.
          </p>
          <p className="mt-4 leading-relaxed">
            Our{" "}
            <strong className="text-gray-900 dark:text-white">
              "Epochalypse countdown"
            </strong>{" "}
            shows a live timer to that critical moment, so you are always
            informed about how much time is left until the real meltdown, aka
            the "Epochalypse".
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            How the Y2038 Countdown Works
          </h2>
          <p className="mb-4 leading-relaxed">
            The countdown timer appearing on this page calculates the time
            remaining until{" "}
            <strong className="text-gray-900 dark:text-white">
              19 January 2038, 03:14:07 UTC
            </strong>
            , from the current time.
          </p>
          <ul className="space-y-2 list-disc list-inside ml-2 mb-4">
            <li>
              It uses the universal Unix epoch reference, i.e,{" "}
              <strong className="text-gray-900 dark:text-white">
                January 1, 1970 00:00:00 UTC
              </strong>
              .
            </li>
            <li>
              It converts the target overflow into a readable timestamp by
              subtracting the current time from the "Epochalypse" moment to get
              the remaining{" "}
              <strong className="text-gray-900 dark:text-white">
                years, days, hours, minutes, and seconds
              </strong>
              .
            </li>
            <li>
              The timer gets updated continuously in the background (in your
              browser), without needing a page refresh.
            </li>
          </ul>
          <p className="mb-4 leading-relaxed">
            Since everything runs client-side, you often get an accurate view
            based on your device's locale-specific clock (often synced within
            seconds) without worrying about the actual target (i.e., the
            Epochalypse), which remains fixed at UTC.
          </p>
          <p className="mb-4 leading-relaxed">
            If any systems with such configurations are still running beyond
            2038, they might:
          </p>
          <ul className="space-y-2 list-disc list-inside ml-2 mb-4">
            <li>Log the incorrect date value and jump back to 1901.</li>
            <li>
              Might fail in scheduling tasks that rely on any future timestamps
              beyond 2038
            </li>
            <li>
              Break any major security mechanisms or licenses that are tightly
              coupled with expiration time based on Unix time.
            </li>
          </ul>
          <p className="leading-relaxed">
            Using a countdown for such an event makes it more accurate to feel
            the risk: although not an abstract bug, but a specific moment in
            time that your infrastructure{" "}
            <strong className="text-gray-900 dark:text-white">is not</strong>{" "}
            prepared for.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            How This Relates to Epoch & Unix Time
          </h2>
          <p className="mb-4 leading-relaxed">
            The Year 2038 (Y2038) problem is deeply associated with how the{" "}
            <strong className="text-gray-900 dark:text-white">Unix time</strong>{" "}
            works. Unix time represents time as the number of seconds passed
            since the Unix epoch, i.e.,{" "}
            <strong className="text-gray-900 dark:text-white">
              January 1, 1970 00:00:00 UTC
            </strong>
            . The maximum value of a{" "}
            <strong className="text-gray-900 dark:text-white">
              32-bit signed integer
            </strong>{" "}
            is - 2,147,483,647 (2³¹ − 1), which directly corresponds exactly to
            the 2038 rollover moment.
          </p>
          <p className="leading-relaxed">
            Our other tools, like the{" "}
            <Link
              to="/"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              <strong className="text-gray-900 dark:text-white">
                Unix Timestamp Converter
              </strong>
            </Link>
            , helps you:
          </p>
          <ul className="space-y-2 list-disc list-inside ml-2 mb-4 mt-4">
            <li>Convert timestamps to human-readable dates</li>
            <li>
              Determine the difference between the given date and the Unix epoch
              timestamp
            </li>
            <li>Accurately view the current week of the year.</li>
          </ul>
          <p className="leading-relaxed">
            The{" "}
            <strong className="text-gray-900 dark:text-white">
              Epochalypse countdown
            </strong>{" "}
            when complete other tools like{" "}
            <Link
              to="/week-number"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              "Week Number Calculator"
            </Link>{" "}
            and the "Unix Timestamp Converter" by tracking the critical 2038
            Unix overflow affecting legacy systems running on 32-bit systems.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Common Use Cases for the Y2038 Countdown
          </h2>

          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              Legacy Systems Audit
            </h3>
            <p className="mb-4 leading-relaxed">
              Engineering teams can use this countdown as a visual aid to audit:
            </p>
            <ul className="space-y-2 list-disc list-inside ml-2 mb-4">
              <li>
                Which systems still run on{" "}
                <strong className="text-gray-900 dark:text-white">
                  32-bit architectures
                </strong>{" "}
                and need to be updated to 64-bit systems?
              </li>
              <li>
                Which old applications or services still assume the old 32-bit
                Unix timestamps and are likely to crash?
              </li>
              <li>
                Where long-lived records like certificates, leases, or
                subscriptions extend beyond the year 2038.
              </li>
            </ul>
            <p className="leading-relaxed">
              Aligning your audits and migration plan with the countdown often
              ensures you don't leave critical systems hanging and unpatched as
              the "Epochalypse" date approaches.
            </p>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              Education & Training
            </h3>
            <p className="mb-4 leading-relaxed">
              The Year 2038 problem is a great learning opportunity for:
            </p>
            <ul className="space-y-2 list-disc list-inside ml-2 mb-4">
              <li>
                <strong className="text-gray-900 dark:text-white">
                  32-bit Integer overflow
                </strong>{" "}
                and different data type limits.
              </li>
              <li>
                Proper Time handling and date APIs for different native
                languages as per the specific locale.
              </li>
              <li>
                The importance of proper and accurate planning for long-lived
                systems.
              </li>
            </ul>
            <p className="leading-relaxed">
              Teams can often show the countdown during internal talks or
              onboarding to explain why time-related issues are often critical
              to handle and why proper handling matters.
            </p>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              Monitoring & Compliance
            </h3>
            <p className="mb-4 leading-relaxed">
              Organizations that have strict regulatory commitments must keep a
              Y2038 countdown as part of their{" "}
              <strong className="text-gray-900 dark:text-white">
                risk dashboard
              </strong>
              :
            </p>
            <ul className="space-y-2 list-disc list-inside ml-2 mb-4">
              <li>
                To accurately track how much time is left to complete the
                migrations
              </li>
              <li>To reliably document the long-term site readiness plans</li>
              <li>
                To reassure the stakeholders about 32-but dependencies being
                phased out before the "Epochalypse" countdown and regain their
                trust.
              </li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Frequently Asked Questions About the Year 2038 Problem
          </h2>
          <div className="space-y-4">
            <div>
              <p className="mb-2 leading-relaxed">
                <strong className="text-gray-900 dark:text-white">
                  Will all systems break in 2038?
                </strong>
                <br />
                No. Only systems that still rely on old{" "}
                <strong className="text-gray-900 dark:text-white">
                  32-bit signed Unix timestamps
                </strong>{" "}
                without any plans to update them to newer and robust 64-bit
                ones. Most modern 64-bit systems already come with the
                functionality to handle the dates far beyond 2038.
              </p>
            </div>
            <div>
              <p className="mb-2 leading-relaxed">
                <strong className="text-gray-900 dark:text-white">
                  What kinds of software/systems are at most risk?
                </strong>
                <br />
                Legacy{" "}
                <strong className="text-gray-900 dark:text-white">
                  32‑bit OSes
                </strong>
                , old application binaries, embedded devices, and firmware that
                were neither updated nor have any plans to do the same are the
                ones that will be most affected until and unless otherwise
                updated properly.
              </p>
            </div>
            <div>
              <p className="mb-2 leading-relaxed">
                <strong className="text-gray-900 dark:text-white">
                  How can I check if my system is affected?
                </strong>
                <br />
                Typical checks include:
              </p>
              <ul className="space-y-2 list-disc list-inside ml-2 mt-2">
                <li>
                  Inspect how your language or platform often represents time.
                </li>
                <li>
                  Testing the dates beyond 2038 in the test environment before
                  moving it to production.
                </li>
                <li>
                  Properly review documentation and update guides for different
                  OSeS, database, or embedded platforms.
                </li>
              </ul>
            </div>

            <div>
              <p className="leading-relaxed">
                Have more questions about our time tools? Check the{" "}
                <Link
                  to="/faq"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  full FAQ section
                </Link>{" "}
                for answers.
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
