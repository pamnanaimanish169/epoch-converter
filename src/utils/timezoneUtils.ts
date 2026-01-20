/**
 * Utility functions for timezone-specific conversions and content generation
 */

import { TimezoneConfig, getTimezoneConfig } from './timezoneConfig';
import { normalizeToMilliseconds } from './epochUtils';
import { TimeUnit } from '../types';

/**
 * Convert epoch timestamp to a specific timezone
 */
export const convertEpochToTimezone = (
  epoch: number,
  timezoneCode: string,
  unit: TimeUnit = 'seconds'
): string => {
  const config = getTimezoneConfig(timezoneCode);
  if (!config) {
    return '';
  }

  const ms = normalizeToMilliseconds(epoch, unit);
  const date = new Date(ms);

  if (isNaN(date.getTime())) {
    return '';
  }

  // Use Intl.DateTimeFormat to format in the specific timezone
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: config.ianaName,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  });

  const parts = formatter.formatToParts(date);
  const year = parts.find(p => p.type === 'year')?.value || '';
  const month = parts.find(p => p.type === 'month')?.value || '';
  const day = parts.find(p => p.type === 'day')?.value || '';
  const hour = parts.find(p => p.type === 'hour')?.value || '';
  const minute = parts.find(p => p.type === 'minute')?.value || '';
  const second = parts.find(p => p.type === 'second')?.value || '';

  return `${year}-${month}-${day} ${hour}:${minute}:${second} ${config.code}`;
};

/**
 * Get current time in a specific timezone
 */
export const getCurrentTimeInTimezone = (timezoneCode: string): string => {
  const now = Date.now();
  const seconds = Math.floor(now / 1000);
  return convertEpochToTimezone(seconds, timezoneCode, 'seconds');
};

/**
 * Generate unique introduction content based on template type
 */
export const generateIntroduction = (config: TimezoneConfig): string => {
  const templates = {
    business: `Epoch timestamps to ${config.code} (${config.utcOffset}) matter most when coordinating with ${config.regions.join(' and ')} teams. ${config.observesDST ? `Unlike fixed timezones, ${config.code} switches to ${config.dstCode} during daylight saving—your epoch converter must account for these shifts to avoid off-by-one-hour errors in deployment logs.` : `Unlike EST or PST, ${config.code} never shifts for daylight saving—your ${config.uniqueTimestamp} always converts to the same ${config.code} hour year-round.`} For developers managing ${config.businessContext.toLowerCase()}, this ${config.observesDST ? 'DST awareness' : 'consistency'} prevents the ${config.observesDST ? 'timezone bugs' : 'DST bugs'} that plague ${config.observesDST ? 'other' : 'US'} timezone conversions.`,
    
    developer: `Converting epoch to ${config.code} (${config.utcOffset}${config.observesDST ? `, switches to ${config.dstCode} at ${config.dstCode === 'EDT' ? 'UTC-4' : config.dstCode === 'PDT' ? 'UTC-7' : 'different offset'}` : ''}) is critical for ${config.regions.join(', ')} operations. ${config.businessContext}. Unlike ${config.observesDST ? 'fixed timezones like IST' : 'timezones with DST'}, ${config.observesDST ? `${config.code}/${config.dstCode} transitions on the second Sunday in March and first Sunday in November` : `${config.code} maintains a constant offset year-round`}—your epoch converter must account for ${config.observesDST ? 'these shifts' : 'this consistency'} to avoid off-by-one-hour errors in deployment logs.`,
    
    financial: `Epoch to ${config.code} (${config.utcOffset}) conversion is essential for ${config.businessContext}. ${config.regions.join(' and ')} financial markets, ${config.regions.length > 1 ? 'exchanges' : 'exchange'}, and trading platforms all timestamp in ${config.code}. ${config.observesDST ? `Unlike fixed timezones, ${config.code} switches to ${config.dstCode} during daylight saving—critical for accurate trade timestamps and settlement times.` : `Unlike US timezones with DST complexity, ${config.code} maintains a constant offset—your financial logs remain consistent year-round.`} For compliance and audit trails, precise ${config.code} conversion prevents timestamp discrepancies that could affect regulatory reporting.`,
    
    compliance: `Converting epoch timestamps to ${config.code} (${config.utcOffset}) is critical for ${config.businessContext}. ${config.regions.join(' and ')} regulations, ${config.regions.length > 1 ? 'GDPR requirements' : 'compliance requirements'}, and legal frameworks require accurate timezone-aware timestamps. ${config.observesDST ? `${config.code} switches to ${config.dstCode} during daylight saving—your compliance logs must handle these transitions correctly.` : `${config.code} never shifts for daylight saving—your compliance timestamps remain consistent year-round.`} For audit trails and legal documentation, precise ${config.code} conversion ensures regulatory compliance.`,
    
    regional: `Epoch to ${config.code} (${config.utcOffset}) conversion matters for ${config.regions.join(' and ')} operations. ${config.geographicCoverage}. ${config.culturalContext ? `${config.culturalContext}. ` : ''}${config.observesDST ? `Unlike fixed timezones, ${config.code} switches to ${config.dstCode} during daylight saving—your conversion logic must account for these shifts.` : `Unlike timezones with DST, ${config.code} maintains a constant offset—your timestamps remain consistent year-round.`} For ${config.businessContext.toLowerCase()}, accurate ${config.code} conversion ensures proper coordination across ${config.regions.length > 1 ? 'regions' : 'the region'}.`
  };

  return templates[config.introductionTemplate] || templates.business;
};

/**
 * Generate timezone-specific code examples
 */
export const generateCodeExamples = (config: TimezoneConfig): {
  python: string;
  javascript: string;
  sql: string;
  excel: string;
} => {
  const exampleEpoch = config.uniqueTimestamp;
  
  // Calculate example output (runtime calculation)
  let exampleOutput = '';
  try {
    exampleOutput = convertEpochToTimezone(exampleEpoch, config.code);
  } catch (e) {
    // Fallback if conversion fails
    exampleOutput = `YYYY-MM-DD HH:MM:SS ${config.code}`;
  }
  
  return {
    python: `# Convert epoch to ${config.code}
from datetime import datetime
import pytz

epoch = ${exampleEpoch}
dt = datetime.fromtimestamp(epoch, tz=pytz.UTC)
${config.code.toLowerCase()}_time = dt.astimezone(pytz.timezone('${config.ianaName}'))
print(${config.code.toLowerCase()}_time.strftime('%Y-%m-%d %H:%M:%S %Z'))

# Output: ${exampleOutput}`,

    javascript: `// Convert epoch to ${config.code}
const epoch = ${exampleEpoch};
const date = new Date(epoch * 1000);
const ${config.code.toLowerCase()}_time = date.toLocaleString('en-US', {
  timeZone: '${config.ianaName}',
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hour12: false
});
console.log(\`\${${config.code.toLowerCase()}_time} ${config.code}\`);

// Output: ${exampleOutput}`,

    sql: `-- Convert epoch to ${config.code}
SELECT 
  FROM_UNIXTIME(${exampleEpoch}) AS utc_time,
  CONVERT_TZ(FROM_UNIXTIME(${exampleEpoch}), 'UTC', '${config.ianaName}') AS ${config.code.toLowerCase()}_time;

-- PostgreSQL
SELECT 
  to_timestamp(${exampleEpoch}) AT TIME ZONE 'UTC' AT TIME ZONE '${config.ianaName}' AS ${config.code.toLowerCase()}_time;`,

    excel: `# Excel formula for ${config.code}
# Assuming epoch timestamp is in cell A1
=${config.excelFormula}

# Or using TEXT function with timezone offset
=TEXT((A1/86400)+DATE(1970,1,1)+(${config.utcOffsetHours}/24),"yyyy-mm-dd hh:mm:ss")`
  };
};

/**
 * Generate real-world scenarios for a timezone
 */
export const generateScenarios = (config: TimezoneConfig): string[] => {
  const scenarios: Record<string, string[]> = {
    IST: [
      `Debugging production issues with your ${config.regions[0]} DevOps team at 2 AM ${config.code} requires accurate epoch conversion. When your US-based monitoring alerts at 4:30 PM EST, that's 3:00 AM ${config.code} the next day—your ${config.regions[0]} team needs precise timestamps to correlate logs.`,
      `Syncing cricket match timestamps for sports betting APIs requires ${config.code} precision. Match start times in ${config.regions[0]} are logged in ${config.code}, and your epoch converter must handle the ${config.utcOffset} offset correctly to display accurate betting windows.`,
      `Coordinating Diwali promotion launches across ${config.regions[0]} e-commerce platforms means handling traffic spikes at specific ${config.code} hours. Your epoch timestamps must convert accurately to ${config.code} to schedule flash sales and analyze peak shopping hours.`
    ],
    EST: [
      `Analyzing NYSE trading data from market open to close requires precise ${config.code} conversion. When the market opens at 9:30 AM ${config.code}, your epoch timestamps must reflect ${config.code} accurately—especially during the ${config.observesDST ? 'EST to EDT transition' : 'trading day'}.`,
      `Coordinating Black Friday deployments across US East Coast servers means converting epoch timestamps to ${config.code}. Your midnight launch in ${config.code} must sync perfectly with server logs timestamped in UTC—one-hour errors could delay critical sales events.`,
      `Parsing financial quarter-end reports timestamped in ${config.code} requires accurate epoch conversion. Your compliance team needs precise ${config.code} timestamps to verify transaction times and meet regulatory deadlines.`
    ],
    PST: [
      `Debugging user activity logs from ${config.regions[0]} customers requires ${config.code} conversion. When a user in ${config.regions[0]} reports an issue at 3 PM ${config.code}, your epoch timestamps must convert correctly to ${config.code} to correlate with their local experience.`,
      `Syncing AWS Lambda execution times in us-west-2 region means converting to ${config.code}. Your serverless functions in ${config.regions[0]} log in UTC, but your ${config.regions[0]} team needs ${config.code} timestamps to debug during business hours.`,
      `Coordinating product launches with ${config.regions[0]} announcements requires ${config.code} precision. When ${config.regions[0]} companies announce at 10 AM ${config.code}, your epoch converter must handle the ${config.observesDST ? `${config.code}/${config.dstCode} transition` : 'constant offset'} to sync global marketing campaigns.`
    ],
    JST: [
      `Analyzing ${config.regions[0]} financial market data requires ${config.code} conversion. ${config.regions[0]} stock exchanges operate in ${config.code}, and your epoch timestamps must convert accurately to ${config.code} for trading analysis and compliance reporting.`,
      `Coordinating with ${config.regions[0]} business partners means converting epoch timestamps to ${config.code}. ${config.regions[0]} business hours are in ${config.code}, and your scheduling system must handle the ${config.utcOffset} offset correctly to avoid meeting time confusion.`,
      `Processing ${config.regions[0]} e-commerce orders requires ${config.code} timestamps. Your order processing system must convert epoch timestamps to ${config.code} to display accurate order times to ${config.regions[0]} customers and handle customer service inquiries.`
    ],
    GMT: [
      `International aviation timestamps use ${config.code} as the baseline. Flight schedules, departure times, and air traffic control logs all reference ${config.code}, making accurate epoch to ${config.code} conversion critical for global aviation operations.`,
      `Scientific research data logging often uses ${config.code} as the standard. When researchers worldwide collaborate, epoch timestamps converted to ${config.code} provide a universal reference point that avoids timezone confusion.`,
      `Global financial markets use ${config.code} for coordination. While local markets operate in their timezones, international transactions and settlements often reference ${config.code}, requiring precise epoch conversion.`
    ],
    AEST: [
      `Australian compliance requirements mandate accurate ${config.code} timestamps. Financial transactions, legal documents, and regulatory filings in ${config.regions[0]} must use ${config.code}, making epoch to ${config.code} conversion essential for compliance.`,
      `Cross-Pacific collaboration between ${config.regions[0]} and US teams requires ${config.code} conversion. When ${config.regions[0]} teams work with ${config.observesDST ? 'US teams in different timezones' : 'Silicon Valley'}, accurate ${config.code} timestamps prevent scheduling errors and missed deadlines.`,
      `${config.regions[0]} business hours are in ${config.code}, and your epoch timestamps must convert correctly for ${config.regions[0]} operations. Whether scheduling meetings or analyzing ${config.regions[0]} server logs, ${config.code} conversion ensures accurate time representation.`
    ],
    CET: [
      `EU GDPR timestamp requirements mandate accurate ${config.code} conversion. When logging user data access or processing events, ${config.code} timestamps ensure compliance with European data protection regulations.`,
      `European banking hours operate in ${config.code}, and your financial transaction logs must convert epoch timestamps to ${config.code}. ${config.observesDST ? `The ${config.code} to ${config.dstCode} transition` : 'The constant offset'} must be handled correctly to maintain audit trail accuracy.`,
      `EU e-commerce platforms timestamp orders in ${config.code}, and your order processing system must convert epoch timestamps accurately. ${config.regions.join(' and ')} customers expect order times displayed in ${config.code}, requiring precise conversion.`
    ]
  };

  // Return timezone-specific scenarios or generate generic ones
  if (scenarios[config.code]) {
    return scenarios[config.code];
  }

  // Generic scenarios based on template type
  const genericScenarios: Record<string, string[]> = {
    business: [
      `Coordinating with ${config.regions.join(' and ')} teams requires accurate ${config.code} conversion. Your epoch timestamps must convert correctly to ${config.code} to align with ${config.businessContext.toLowerCase()} operations.`,
      `Analyzing ${config.regions[0]} server logs means converting epoch timestamps to ${config.code}. Your ${config.regions[0]} infrastructure logs in UTC, but your team needs ${config.code} timestamps to debug during business hours.`,
      `${config.regions[0]} business hours are in ${config.code}, and your scheduling system must handle epoch to ${config.code} conversion correctly to avoid meeting time confusion across timezones.`
    ],
    developer: [
      `Debugging ${config.regions[0]} deployments requires ${config.code} conversion. Your CI/CD pipelines log in UTC, but your ${config.regions[0]} team needs ${config.code} timestamps to correlate deployments with business hours.`,
      `Syncing ${config.regions[0]} server logs with monitoring systems means converting epoch timestamps to ${config.code}. Your alerting system must display times in ${config.code} for ${config.regions[0]} operations teams.`,
      `Coordinating ${config.regions[0]} product launches requires ${config.code} precision. Your epoch timestamps must convert accurately to ${config.code} to schedule releases during ${config.regions[0]} business hours.`
    ],
    financial: [
      `${config.regions[0]} financial markets operate in ${config.code}, and your trading system must convert epoch timestamps accurately. ${config.observesDST ? `The ${config.code} to ${config.dstCode} transition` : 'The constant offset'} must be handled correctly for trade settlement.`,
      `Analyzing ${config.regions[0]} market data requires ${config.code} conversion. Your financial analytics platform must display timestamps in ${config.code} to align with ${config.regions[0]} trading hours.`,
      `Compliance reporting in ${config.regions[0]} mandates ${config.code} timestamps. Your epoch timestamps must convert correctly to ${config.code} for regulatory filings and audit trails.`
    ],
    compliance: [
      `${config.regions[0]} regulations require accurate ${config.code} timestamps. Your compliance logging system must convert epoch timestamps to ${config.code} to meet ${config.regions[0]} regulatory requirements.`,
      `Audit trails in ${config.regions[0]} must use ${config.code} timestamps. Your epoch converter must handle ${config.code} conversion correctly to maintain compliance with ${config.regions[0]} legal frameworks.`,
      `Legal documentation in ${config.regions[0]} requires ${config.code} timestamps. Your document management system must convert epoch timestamps accurately to ${config.code} for court filings and legal proceedings.`
    ],
    regional: [
      `${config.regions[0]} operations require accurate ${config.code} conversion. Your epoch timestamps must convert correctly to ${config.code} to align with ${config.regions[0]} business practices and cultural norms.`,
      `Coordinating with ${config.regions[0]} partners means converting epoch timestamps to ${config.code}. Your collaboration tools must display times in ${config.code} to avoid scheduling confusion.`,
      `${config.regions[0]} business hours are in ${config.code}, and your systems must handle epoch to ${config.code} conversion correctly for ${config.regions[0]} operations.`
    ]
  };

  return genericScenarios[config.introductionTemplate] || genericScenarios.business;
};

/**
 * Generate common issues/pitfalls content
 */
export const generateCommonIssues = (config: TimezoneConfig): string[] => {
  const issues = [
    ...config.pitfalls,
    'Millisecond vs second confusion: Ensure your epoch value matches the expected unit (seconds vs milliseconds)',
    'Negative epoch handling: Epoch values before 1970 are negative and require special handling',
    'Float precision errors: Large epoch values may lose precision if stored as floats—use integers'
  ];

  return issues;
};

