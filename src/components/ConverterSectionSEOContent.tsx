import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export const ConverterSectionSEOContent = () => {
  const { t } = useTranslation();

  // Helper function to render text with markdown-style bold (**text**)
  const renderText = (text: string) => {
    return text.split(/(\*\*[^*]+\*\*)/g).map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        const boldText = part.slice(2, -2);
        return <strong key={index} className="text-gray-900 dark:text-white">{boldText}</strong>;
      }
      return part;
    });
  };

  // Helper to render links in markdown format [text](url)
  const renderWithLinks = (text: string) => {
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    const parts: (string | JSX.Element)[] = [];
    let lastIndex = 0;
    let match;
    let key = 0;

    while ((match = linkRegex.exec(text)) !== null) {
      // Add text before the link
      if (match.index > lastIndex) {
        parts.push(text.substring(lastIndex, match.index));
      }
      // Add the link
      const linkText = match[1];
      const linkUrl = match[2];
      const isExternal = linkUrl.startsWith('http');
      if (isExternal) {
        parts.push(
          <a
            key={key++}
            href={linkUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            {linkText}
          </a>
        );
      } else {
        parts.push(
          <Link key={key++} to={linkUrl} className="text-blue-600 dark:text-blue-400 hover:underline">
            {linkText}
          </Link>
        );
      }
      lastIndex = match.index + match[0].length;
    }
    // Add remaining text
    if (lastIndex < text.length) {
      parts.push(text.substring(lastIndex));
    }
    return parts.length > 0 ? parts : text;
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-800 p-6 transition-colors">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
        {t('seo.converter.title')}
      </h1>

      <div className="space-y-6 text-gray-700 dark:text-gray-300">
        <section>
          {t('seo.converter.intro').split('\n\n').map((paragraph, idx) => (
            <p key={idx} className="mb-4 leading-relaxed">
              {renderText(paragraph)}
            </p>
          ))}
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            {t('seo.converter.whatIsUnix')}
          </h2>
          <p className="mb-4 leading-relaxed">
            <a href="https://en.wikipedia.org/wiki/Unix_time" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">Unix time</a>, {renderText(t('seo.converter.whatIsUnixDescription'))}
          </p>
          <p className="mb-4 leading-relaxed">
            {t('seo.converter.whatIsUnixAdvantages')}
          </p>
          <ul className="space-y-2 list-disc list-inside ml-2 mb-4">
            <li><strong className="text-gray-900 dark:text-white">{t('seo.converter.compact')}</strong>: {t('seo.converter.compactDescription')}</li>
            <li><strong className="text-gray-900 dark:text-white">{t('seo.converter.sortable')}</strong>: {t('seo.converter.sortableDescription')}</li>
            <li><strong className="text-gray-900 dark:text-white">{t('seo.converter.timezoneAgnostic')}</strong>: {t('seo.converter.timezoneAgnosticDescription')}</li>
            <li><strong className="text-gray-900 dark:text-white">{t('seo.converter.universal')}</strong>: {t('seo.converter.universalDescription')}</li>
          </ul>
          <p className="mb-4 leading-relaxed">
            <strong className="text-gray-900 dark:text-white">{t('seo.converter.example')}</strong>: <code className="px-1 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-sm">1733832800</code> = {renderText(t('seo.converter.exampleDescription'))}<br />
            <strong className="text-gray-900 dark:text-white">{t('seo.converter.inIst')}</strong>: {t('seo.converter.inIstDescription')}
          </p>
          <p className="mb-4 leading-relaxed">
            <strong className="text-gray-900 dark:text-white">{t('seo.converter.precisionVariants')}</strong>:
          </p>
          <pre className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto mb-4 text-sm">
            <code>
              {t('seo.converter.precisionVariantsCode').split('\n').map((line, idx) => (
                <span key={idx}>
                  {line}
                  {idx < t('seo.converter.precisionVariantsCode').split('\n').length - 1 && <br />}
                </span>
              ))}
            </code>
          </pre>
          <p className="leading-relaxed">
            {renderText(t('seo.converter.pasteAnyEpoch'))}
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            {t('seo.converter.convertEpoch')}
          </h2>
          <p className="mb-4 leading-relaxed">
            {renderText(t('seo.converter.convertEpochDescription'))}
          </p>
          <p className="mb-4 leading-relaxed">
            {t('seo.converter.howToUse')}
          </p>
          <ol className="space-y-2 list-decimal list-inside ml-2 mb-4">
            <li><strong className="text-gray-900 dark:text-white">{t('seo.converter.input')}</strong>: {t('seo.converter.inputDescription')}</li>
            <li><strong className="text-gray-900 dark:text-white">{t('seo.converter.output')}</strong>: {t('seo.converter.outputDescription')}</li>
          </ol>
          <p className="mb-4 leading-relaxed">
            <strong className="text-gray-900 dark:text-white">{t('seo.converter.liveExample')}</strong>:
          </p>
          <pre className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto mb-4 text-sm">
            <code>
              {t('seo.converter.liveExampleCode').split('\n').map((line, idx) => (
                <span key={idx}>
                  {line}
                  {idx < t('seo.converter.liveExampleCode').split('\n').length - 1 && <br />}
                </span>
              ))}
            </code>
          </pre>
          <p className="leading-relaxed">
            {renderText(t('seo.converter.reverseConversion'))}
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            {t('seo.converter.commonUseCases')}
          </h2>

          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              {t('seo.converter.apiPayloadValidation')}
            </h3>
            <p className="mb-4 leading-relaxed">
              {renderText(t('seo.converter.apiPayloadValidationDescription'))}
            </p>
            <pre className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto mb-4 text-sm">
              <code>
                {t('seo.converter.restApiExampleCode')}
              </code>
            </pre>
            <p className="mb-4 leading-relaxed">
              {renderText(t('seo.converter.restApiValidation'))}
            </p>
            <ul className="space-y-2 list-disc list-inside ml-2 mb-4">
              {(t('seo.converter.restApiValidationList', { returnObjects: true }) as string[]).map((item, idx) => (
                <li key={idx}>{renderText(item)}</li>
              ))}
            </ul>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              {t('seo.converter.jwtValidation')}
            </h3>
            <p className="mb-4 leading-relaxed">
              {renderText(t('seo.converter.jwtValidationDescription'))}
            </p>
            <pre className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto mb-4 text-sm">
              <code>
                {t('seo.converter.jwtExampleCode')}
              </code>
            </pre>
            <p className="mb-4 leading-relaxed">
              {renderText(t('seo.converter.jwtValidationBenefits'))}
            </p>
            <ul className="space-y-2 list-disc list-inside ml-2 mb-4">
              {(t('seo.converter.jwtValidationBenefitsList', { returnObjects: true }) as string[]).map((item, idx) => (
                <li key={idx}>{renderText(item)}</li>
              ))}
            </ul>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              {t('seo.converter.codeValidation')}
            </h3>
            <pre className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto mb-4 text-sm">
              <code>
                {t('seo.converter.codeValidationCode')}
              </code>
            </pre>
            <p className="leading-relaxed">
              {renderWithLinks(t('seo.converter.codeValidationDescription'))}
            </p>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              {t('seo.converter.databaseTimestampStorage')}
            </h3>
            <p className="mb-4 leading-relaxed">
              {renderText(t('seo.converter.databaseTimestampStorageDescription'))}
            </p>
            <p className="mb-4 leading-relaxed">
              <strong className="text-gray-900 dark:text-white">{t('seo.converter.mysql')}</strong>:
            </p>
            <pre className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto mb-4 text-sm">
              <code>
                {t('seo.converter.mysqlCode')}
              </code>
            </pre>
            <p className="mb-4 leading-relaxed">
              <strong className="text-gray-900 dark:text-white">{t('seo.converter.postgresql')}</strong>:
            </p>
            <pre className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto mb-4 text-sm">
              <code>
                {t('seo.converter.postgresqlCode')}
              </code>
            </pre>
            <p className="mb-4 leading-relaxed">
              {renderText(t('seo.converter.commonErrorsFixed'))}
            </p>
            <p className="leading-relaxed">
              {renderText(t('seo.converter.useOurConverter'))}
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            {t('seo.converter.timezoneDst')}
          </h2>
          <p className="mb-4 leading-relaxed">
            {renderText(t('seo.converter.timezoneDstDescription'))}
          </p>
          <p className="mb-4 leading-relaxed">
            <strong className="text-gray-900 dark:text-white">{t('seo.converter.ist')}</strong>: {t('seo.converter.istDescription')}<br />
            <strong className="text-gray-900 dark:text-white">{t('seo.converter.pstPdt')}</strong>: {t('seo.converter.pstPdtDescription')}
          </p>
          <p className="mb-4 leading-relaxed">
            {renderWithLinks(t('seo.converter.ianaTimeZones'))}
          </p>
          <p className="mb-4 leading-relaxed">
            <strong className="text-gray-900 dark:text-white">{t('seo.converter.exampleDstImpact')}</strong>:
          </p>
          <pre className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto mb-4 text-sm">
            <code>
              {t('seo.converter.exampleDstImpactCode').split('\n').map((line, idx) => (
                <span key={idx}>
                  {line}
                  {idx < t('seo.converter.exampleDstImpactCode').split('\n').length - 1 && <br />}
                </span>
              ))}
            </code>
          </pre>
          <p className="mb-4 leading-relaxed">
            <strong className="text-gray-900 dark:text-white">{t('seo.converter.productionDebugging')}</strong>:
          </p>
          <ol className="space-y-2 list-decimal list-inside ml-2 mb-4">
            {(t('seo.converter.productionDebuggingSteps', { returnObjects: true }) as string[]).map((item, idx) => (
              <li key={idx}><strong className="text-gray-900 dark:text-white">{renderText(item)}</strong></li>
            ))}
          </ol>
          <p className="mb-4 leading-relaxed">
            <strong className="text-gray-900 dark:text-white">{t('seo.converter.codeFix')}</strong>:
          </p>
          <pre className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto mb-4 text-sm">
            <code>
              {t('seo.converter.codeFixCode')}
            </code>
          </pre>
          <p className="leading-relaxed">
            {renderText(t('seo.converter.codeFixDescription'))}
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            {t('seo.converter.faq')}
          </h2>
          <div className="space-y-4">
            <div>
              <p className="mb-2 leading-relaxed">
                <strong className="text-gray-900 dark:text-white">{t('seo.converter.whatTimezone')}</strong><br />
                {renderText(t('seo.converter.whatTimezoneAnswer'))}
              </p>
            </div>
            <div>
              <p className="mb-2 leading-relaxed">
                <strong className="text-gray-900 dark:text-white">{t('seo.converter.secondsOrMilliseconds')}</strong><br />
                {t('seo.converter.secondsOrMillisecondsAnswer').split('\n').map((line, idx) => (
                  <span key={idx}>
                    {renderText(line)}
                    {idx < t('seo.converter.secondsOrMillisecondsAnswer').split('\n').length - 1 && <br />}
                  </span>
                ))}
              </p>
            </div>
            <div>
              <p className="mb-2 leading-relaxed">
                <strong className="text-gray-900 dark:text-white">{t('seo.converter.willItWorkAfter2038')}</strong><br />
                {t('seo.converter.willItWorkAfter2038Answer').split('\n').map((line, idx) => (
                  <span key={idx}>
                    {renderText(line)}
                    {idx < t('seo.converter.willItWorkAfter2038Answer').split('\n').length - 1 && <br />}
                  </span>
                ))}
              </p>
            </div>
            <div>
              <p className="mb-2 leading-relaxed">
                <strong className="text-gray-900 dark:text-white">{t('seo.converter.isItSafe')}</strong><br />
                {renderText(t('seo.converter.isItSafeAnswer'))}
              </p>
            </div>
            <div>
              <p className="mb-2 leading-relaxed">
                <strong className="text-gray-900 dark:text-white">{t('seo.converter.freeForever')}</strong><br />
                {renderText(t('seo.converter.freeForeverAnswer'))}
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            {t('seo.converter.relatedTools')}
          </h2>
          <p className="mb-4 leading-relaxed">
            {renderText(t('seo.converter.relatedToolsDescription'))}
          </p>
          <ul className="space-y-2 list-disc list-inside ml-2 mb-4">
            {(t('seo.converter.relatedToolsLinks', { returnObjects: true }) as string[]).map((link, idx) => (
              <li key={idx} className="leading-relaxed">
                {renderWithLinks(link)}
              </li>
            ))}
          </ul>
        </section>

        <section className="pt-4 border-t border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-600 dark:text-gray-400 italic">
            {t('seo.converter.authorFooter').split('\n').map((line, idx) => (
              <span key={idx}>
                {line}
                {idx < t('seo.converter.authorFooter').split('\n').length - 1 && <br />}
              </span>
            ))}
          </p>
        </section>
      </div>
    </div>
  );
};
