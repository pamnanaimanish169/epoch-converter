/**
 * Timezone Configuration for Programmatic SEO
 * Contains all 45 timezones with unique content data to avoid duplication
 */

export interface TimezoneConfig {
  code: string;
  fullName: string;
  ianaName: string;
  utcOffset: string;
  utcOffsetHours: number;
  observesDST: boolean;
  dstCode?: string; // e.g., 'EDT' for EST
  regions: string[];
  businessContext: string;
  commonUseCases: string[];
  uniqueTimestamp: number; // Timestamp during business hours for this timezone
  dstNotes: string;
  excelFormula: string;
  pitfalls: string[];
  introductionTemplate: 'business' | 'developer' | 'financial' | 'compliance' | 'regional';
  relatedTimezones: string[]; // For internal linking
  geographicCoverage: string;
  culturalContext?: string;
}

// All 45 timezones organized by region
export const TIMEZONE_CONFIGS: Record<string, TimezoneConfig> = {
  // European Timezones
  IST: {
    code: 'IST',
    fullName: 'India Standard Time',
    ianaName: 'Asia/Kolkata',
    utcOffset: '+05:30',
    utcOffsetHours: 5.5,
    observesDST: false,
    regions: ['India', 'Sri Lanka'],
    businessContext: 'Indian IT sector, South Asian commerce',
    commonUseCases: [
      'Offshore development coordination',
      'Cricket/sports betting timestamps',
      'Indian e-commerce analytics'
    ],
    uniqueTimestamp: 1764193600, // 5:40 PM IST - Indian business hours
    dstNotes: 'IST never observes daylight saving time',
    excelFormula: '=(A1/86400)+25569+(5.5/24)',
    pitfalls: [
      'The half-hour offset (+5:30) requires special handling',
      'Never adjust for DST—IST is constant year-round'
    ],
    introductionTemplate: 'business',
    relatedTimezones: ['GST', 'SGT', 'JST', 'PKT'],
    geographicCoverage: 'India Standard Time covers all of India, from Mumbai to Kolkata, spanning 2,933 kilometers east to west',
    culturalContext: 'Monsoon season affects business hours, and Diwali celebrations create timestamp spikes in e-commerce logs'
  },
  GMT: {
    code: 'GMT',
    fullName: 'Greenwich Mean Time',
    ianaName: 'Europe/London',
    utcOffset: '+00:00',
    utcOffsetHours: 0,
    observesDST: true,
    dstCode: 'BST',
    regions: ['United Kingdom', 'Ireland', 'Portugal'],
    businessContext: 'International aviation, scientific research standards',
    commonUseCases: [
      'Aviation timestamps',
      'Scientific data logging',
      'International coordination baseline'
    ],
    uniqueTimestamp: 1733832800, // 12:00 PM GMT - midday
    dstNotes: 'Switches to BST (British Summer Time, UTC+1) from last Sunday in March to last Sunday in October',
    excelFormula: '=(A1/86400)+25569',
    pitfalls: [
      'GMT switches to BST during summer—check the date',
      'Not the same as UTC (though often used interchangeably)',
      'London financial markets use GMT/BST'
    ],
    introductionTemplate: 'compliance',
    relatedTimezones: ['WET', 'CET', 'EST', 'UTC'],
    geographicCoverage: 'Greenwich Mean Time serves as the prime meridian reference, used across the UK and as a baseline for global time coordination'
  },
  BST: {
    code: 'BST',
    fullName: 'British Summer Time',
    ianaName: 'Europe/London',
    utcOffset: '+01:00',
    utcOffsetHours: 1,
    observesDST: false, // BST is the DST version
    regions: ['United Kingdom'],
    businessContext: 'UK financial markets, London business hours',
    commonUseCases: [
      'London Stock Exchange timestamps',
      'UK e-commerce order processing',
      'British banking hours'
    ],
    uniqueTimestamp: 1711972800, // 1:00 PM BST - summer business hours
    dstNotes: 'BST is the daylight saving version of GMT, active from late March to late October',
    excelFormula: '=(A1/86400)+25569+(1/24)',
    pitfalls: [
      'BST only exists during UK summer months',
      'Automatically switches back to GMT in October',
      'London uses BST from last Sunday in March'
    ],
    introductionTemplate: 'financial',
    relatedTimezones: ['GMT', 'WET', 'CET', 'IST'],
    geographicCoverage: 'British Summer Time applies across the entire United Kingdom during daylight saving period'
  },
  WET: {
    code: 'WET',
    fullName: 'Western European Time',
    ianaName: 'Atlantic/Canary',
    utcOffset: '+00:00',
    utcOffsetHours: 0,
    observesDST: true,
    dstCode: 'WEST',
    regions: ['Portugal', 'Canary Islands', 'Madeira'],
    businessContext: 'Iberian Peninsula business operations',
    commonUseCases: [
      'Portuguese financial transactions',
      'Canary Islands tourism timestamps',
      'Iberian e-commerce'
    ],
    uniqueTimestamp: 1733832800,
    dstNotes: 'Switches to WEST (UTC+1) during daylight saving',
    excelFormula: '=(A1/86400)+25569',
    pitfalls: [
      'WET switches to WEST during summer months',
      'Portugal mainland uses WET/WEST',
      'Different from CET used in Spain'
    ],
    introductionTemplate: 'business',
    relatedTimezones: ['WEST', 'GMT', 'CET'],
    geographicCoverage: 'Western European Time covers Portugal and the Canary Islands'
  },
  WEST: {
    code: 'WEST',
    fullName: 'Western European Summer Time',
    ianaName: 'Atlantic/Canary',
    utcOffset: '+01:00',
    utcOffsetHours: 1,
    observesDST: false,
    regions: ['Portugal', 'Canary Islands'],
    businessContext: 'Iberian summer business hours',
    commonUseCases: [
      'Summer tourism timestamps',
      'Portuguese business coordination',
      'Canary Islands peak season'
    ],
    uniqueTimestamp: 1711972800,
    dstNotes: 'WEST is the daylight saving version of WET',
    excelFormula: '=(A1/86400)+25569+(1/24)',
    pitfalls: [
      'Only active during daylight saving period',
      'Automatically reverts to WET in October'
    ],
    introductionTemplate: 'business',
    relatedTimezones: ['WET', 'CET', 'GMT'],
    geographicCoverage: 'Western European Summer Time applies to Portugal and Canary Islands during summer'
  },
  CET: {
    code: 'CET',
    fullName: 'Central European Time',
    ianaName: 'Europe/Paris',
    utcOffset: '+01:00',
    utcOffsetHours: 1,
    observesDST: true,
    dstCode: 'CEST',
    regions: ['France', 'Germany', 'Italy', 'Spain', 'Poland', 'Netherlands', 'Belgium'],
    businessContext: 'EU GDPR timestamp requirements, European banking hours',
    commonUseCases: [
      'GDPR compliance logging',
      'European banking transactions',
      'EU e-commerce timestamps'
    ],
    uniqueTimestamp: 1733832800,
    dstNotes: 'Switches to CEST (UTC+2) from last Sunday in March to last Sunday in October',
    excelFormula: '=(A1/86400)+25569+(1/24)',
    pitfalls: [
      'CET switches to CEST during summer—critical for GDPR logs',
      'EU financial systems must handle DST transitions',
      '2 AM transition hour on switch days'
    ],
    introductionTemplate: 'compliance',
    relatedTimezones: ['CEST', 'EET', 'GMT', 'EST'],
    geographicCoverage: 'Central European Time spans from Paris to Warsaw, covering most of continental Europe'
  },
  CEST: {
    code: 'CEST',
    fullName: 'Central European Summer Time',
    ianaName: 'Europe/Paris',
    utcOffset: '+02:00',
    utcOffsetHours: 2,
    observesDST: false,
    regions: ['France', 'Germany', 'Italy', 'Spain', 'Poland'],
    businessContext: 'EU summer business operations',
    commonUseCases: [
      'Summer GDPR compliance',
      'European vacation season timestamps',
      'EU summer business hours'
    ],
    uniqueTimestamp: 1711972800,
    dstNotes: 'CEST is the daylight saving version of CET',
    excelFormula: '=(A1/86400)+25569+(2/24)',
    pitfalls: [
      'Only active during European summer',
      'Reverts to CET in late October',
      'EU-wide synchronized transition'
    ],
    introductionTemplate: 'compliance',
    relatedTimezones: ['CET', 'EEST', 'GMT'],
    geographicCoverage: 'Central European Summer Time applies across most of continental Europe during summer'
  },
  EET: {
    code: 'EET',
    fullName: 'Eastern European Time',
    ianaName: 'Europe/Helsinki',
    utcOffset: '+02:00',
    utcOffsetHours: 2,
    observesDST: true,
    dstCode: 'EEST',
    regions: ['Finland', 'Greece', 'Romania', 'Bulgaria', 'Ukraine'],
    businessContext: 'Eastern European business operations',
    commonUseCases: [
      'Eastern EU financial transactions',
      'Baltic business coordination',
      'Greek tourism timestamps'
    ],
    uniqueTimestamp: 1733832800,
    dstNotes: 'Switches to EEST (UTC+3) during daylight saving',
    excelFormula: '=(A1/86400)+25569+(2/24)',
    pitfalls: [
      'EET switches to EEST during summer',
      'Finland and Greece use EET/EEST',
      'Two hours ahead of CET'
    ],
    introductionTemplate: 'business',
    relatedTimezones: ['EEST', 'CET', 'MSK'],
    geographicCoverage: 'Eastern European Time covers Finland, Greece, Romania, and parts of Eastern Europe'
  },
  EEST: {
    code: 'EEST',
    fullName: 'Eastern European Summer Time',
    ianaName: 'Europe/Helsinki',
    utcOffset: '+03:00',
    utcOffsetHours: 3,
    observesDST: false,
    regions: ['Finland', 'Greece', 'Romania'],
    businessContext: 'Eastern EU summer operations',
    commonUseCases: [
      'Summer tourism in Greece',
      'Baltic summer business hours',
      'Eastern EU summer timestamps'
    ],
    uniqueTimestamp: 1711972800,
    dstNotes: 'EEST is the daylight saving version of EET',
    excelFormula: '=(A1/86400)+25569+(3/24)',
    pitfalls: [
      'Only active during summer months',
      'Reverts to EET in October'
    ],
    introductionTemplate: 'business',
    relatedTimezones: ['EET', 'CEST', 'MSK'],
    geographicCoverage: 'Eastern European Summer Time applies to Finland, Greece, and Romania during summer'
  },
  MSK: {
    code: 'MSK',
    fullName: 'Moscow Standard Time',
    ianaName: 'Europe/Moscow',
    utcOffset: '+03:00',
    utcOffsetHours: 3,
    observesDST: false,
    regions: ['Russia (Western)'],
    businessContext: 'Russian business operations',
    commonUseCases: [
      'Russian financial transactions',
      'Moscow business hours',
      'Russian e-commerce timestamps'
    ],
    uniqueTimestamp: 1733832800,
    dstNotes: 'MSK does not observe daylight saving time since 2014',
    excelFormula: '=(A1/86400)+25569+(3/24)',
    pitfalls: [
      'MSK permanently fixed at UTC+3 since 2014',
      'No DST transitions to worry about',
      'Three hours ahead of GMT'
    ],
    introductionTemplate: 'business',
    relatedTimezones: ['EET', 'EEST', 'IST'],
    geographicCoverage: 'Moscow Standard Time covers western Russia, including Moscow and St. Petersburg'
  },

  // North American Timezones
  EST: {
    code: 'EST',
    fullName: 'Eastern Standard Time',
    ianaName: 'America/New_York',
    utcOffset: '-05:00',
    utcOffsetHours: -5,
    observesDST: true,
    dstCode: 'EDT',
    regions: ['United States (East Coast)', 'Canada (Ontario, Quebec)'],
    businessContext: 'US financial markets, NYSE trading hours relevance',
    commonUseCases: [
      'NYSE trading timestamps',
      'US East Coast server logs',
      'Financial quarter-end reports'
    ],
    uniqueTimestamp: 1733832800, // During EST period
    dstNotes: 'Switches to EDT (UTC-4) from second Sunday in March to first Sunday in November',
    excelFormula: '=(A1/86400)+25569-(5/24)',
    pitfalls: [
      'EST switches to EDT—timestamps from March-November need EDT offset (-4), not EST (-5)',
      'Spring forward/fall back dates: second Sunday in March, first Sunday in November',
      'Financial systems must handle the 2 AM transition hour on switch days'
    ],
    introductionTemplate: 'financial',
    relatedTimezones: ['EDT', 'CST', 'PST', 'GMT'],
    geographicCoverage: 'Eastern Time spans from Maine to Florida, covering major US financial centers like New York and Boston'
  },
  EDT: {
    code: 'EDT',
    fullName: 'Eastern Daylight Time',
    ianaName: 'America/New_York',
    utcOffset: '-04:00',
    utcOffsetHours: -4,
    observesDST: false,
    regions: ['United States (East Coast)', 'Canada (Ontario)'],
    businessContext: 'US summer financial operations',
    commonUseCases: [
      'Summer NYSE trading hours',
      'US East Coast summer deployments',
      'Summer financial reporting'
    ],
    uniqueTimestamp: 1711972800, // During EDT period
    dstNotes: 'EDT is the daylight saving version of EST',
    excelFormula: '=(A1/86400)+25569-(4/24)',
    pitfalls: [
      'Only active from March to November',
      'Automatically switches back to EST in November',
      'NYSE uses EDT during summer months'
    ],
    introductionTemplate: 'financial',
    relatedTimezones: ['EST', 'CDT', 'PDT'],
    geographicCoverage: 'Eastern Daylight Time applies to US East Coast during daylight saving period'
  },
  CST: {
    code: 'CST',
    fullName: 'Central Standard Time',
    ianaName: 'America/Chicago',
    utcOffset: '-06:00',
    utcOffsetHours: -6,
    observesDST: true,
    dstCode: 'CDT',
    regions: ['United States (Central)', 'Canada (Manitoba, Saskatchewan)'],
    businessContext: 'Central US business operations',
    commonUseCases: [
      'Central US server logs',
      'Chicago business hours',
      'Central timezone e-commerce'
    ],
    uniqueTimestamp: 1733832800,
    dstNotes: 'Switches to CDT (UTC-5) during daylight saving',
    excelFormula: '=(A1/86400)+25569-(6/24)',
    pitfalls: [
      'CST switches to CDT during summer',
      'One hour behind EST/EDT',
      'Chicago uses CST/CDT'
    ],
    introductionTemplate: 'business',
    relatedTimezones: ['CDT', 'EST', 'MST'],
    geographicCoverage: 'Central Standard Time spans from Texas to Minnesota, covering Chicago and Dallas'
  },
  CDT: {
    code: 'CDT',
    fullName: 'Central Daylight Time',
    ianaName: 'America/Chicago',
    utcOffset: '-05:00',
    utcOffsetHours: -5,
    observesDST: false,
    regions: ['United States (Central)'],
    businessContext: 'Central US summer operations',
    commonUseCases: [
      'Summer Central US deployments',
      'Chicago summer business hours',
      'Central timezone summer timestamps'
    ],
    uniqueTimestamp: 1711972800,
    dstNotes: 'CDT is the daylight saving version of CST',
    excelFormula: '=(A1/86400)+25569-(5/24)',
    pitfalls: [
      'Only active during daylight saving period',
      'Reverts to CST in November'
    ],
    introductionTemplate: 'business',
    relatedTimezones: ['CST', 'EDT', 'MDT'],
    geographicCoverage: 'Central Daylight Time applies to Central US during summer'
  },
  MST: {
    code: 'MST',
    fullName: 'Mountain Standard Time',
    ianaName: 'America/Denver',
    utcOffset: '-07:00',
    utcOffsetHours: -7,
    observesDST: true,
    dstCode: 'MDT',
    regions: ['United States (Mountain)', 'Canada (Alberta)'],
    businessContext: 'Mountain US business operations',
    commonUseCases: [
      'Denver business hours',
      'Mountain timezone server logs',
      'Rocky Mountain region timestamps'
    ],
    uniqueTimestamp: 1733832800,
    dstNotes: 'Switches to MDT (UTC-6) during daylight saving',
    excelFormula: '=(A1/86400)+25569-(7/24)',
    pitfalls: [
      'MST switches to MDT during summer',
      'Arizona does NOT observe DST (stays on MST)',
      'One hour behind CST/CDT'
    ],
    introductionTemplate: 'business',
    relatedTimezones: ['MDT', 'CST', 'PST'],
    geographicCoverage: 'Mountain Standard Time covers Colorado, Utah, Arizona (no DST), and parts of the Rocky Mountains'
  },
  MDT: {
    code: 'MDT',
    fullName: 'Mountain Daylight Time',
    ianaName: 'America/Denver',
    utcOffset: '-06:00',
    utcOffsetHours: -6,
    observesDST: false,
    regions: ['United States (Mountain)'],
    businessContext: 'Mountain US summer operations',
    commonUseCases: [
      'Summer Denver deployments',
      'Mountain timezone summer business',
      'Summer Rocky Mountain timestamps'
    ],
    uniqueTimestamp: 1711972800,
    dstNotes: 'MDT is the daylight saving version of MST (Arizona excluded)',
    excelFormula: '=(A1/86400)+25569-(6/24)',
    pitfalls: [
      'Only active during daylight saving (Arizona stays on MST)',
      'Reverts to MST in November'
    ],
    introductionTemplate: 'business',
    relatedTimezones: ['MST', 'CDT', 'PDT'],
    geographicCoverage: 'Mountain Daylight Time applies to Mountain US (except Arizona) during summer'
  },
  PST: {
    code: 'PST',
    fullName: 'Pacific Standard Time',
    ianaName: 'America/Los_Angeles',
    utcOffset: '-08:00',
    utcOffsetHours: -8,
    observesDST: true,
    dstCode: 'PDT',
    regions: ['United States (West Coast)', 'Canada (British Columbia)'],
    businessContext: 'Silicon Valley tech deployments, West Coast dev workflows',
    commonUseCases: [
      'Silicon Valley server logs',
      'West Coast tech deployments',
      'California e-commerce timestamps'
    ],
    uniqueTimestamp: 1733832800,
    dstNotes: 'Switches to PDT (UTC-7) on the second Sunday in March and first Sunday in November',
    excelFormula: '=(A1/86400)+25569-(8/24)',
    pitfalls: [
      'Same DST rules as EST but 3 hours behind—critical for cross-country deployments',
      'Seattle, LA, SF all share this zone despite spanning 1,000+ miles',
      'Gaming servers in PDT must sync with East Coast players in EDT'
    ],
    introductionTemplate: 'developer',
    relatedTimezones: ['PDT', 'MST', 'EST', 'AKST'],
    geographicCoverage: 'Pacific Standard Time spans from Seattle to Los Angeles, covering Silicon Valley and major West Coast tech hubs'
  },
  PDT: {
    code: 'PDT',
    fullName: 'Pacific Daylight Time',
    ianaName: 'America/Los_Angeles',
    utcOffset: '-07:00',
    utcOffsetHours: -7,
    observesDST: false,
    regions: ['United States (West Coast)'],
    businessContext: 'West Coast summer tech operations',
    commonUseCases: [
      'Summer Silicon Valley deployments',
      'West Coast summer business hours',
      'California summer timestamps'
    ],
    uniqueTimestamp: 1711972800,
    dstNotes: 'PDT is the daylight saving version of PST',
    excelFormula: '=(A1/86400)+25569-(7/24)',
    pitfalls: [
      'Only active from March to November',
      'Reverts to PST in November',
      'Three hours behind EDT during summer'
    ],
    introductionTemplate: 'developer',
    relatedTimezones: ['PST', 'MDT', 'AKDT'],
    geographicCoverage: 'Pacific Daylight Time applies to US West Coast during daylight saving period'
  },
  AKST: {
    code: 'AKST',
    fullName: 'Alaska Standard Time',
    ianaName: 'America/Anchorage',
    utcOffset: '-09:00',
    utcOffsetHours: -9,
    observesDST: true,
    dstCode: 'AKDT',
    regions: ['United States (Alaska)'],
    businessContext: 'Alaskan business operations',
    commonUseCases: [
      'Alaska server logs',
      'Alaskan business hours',
      'Arctic region timestamps'
    ],
    uniqueTimestamp: 1733832800,
    dstNotes: 'Switches to AKDT (UTC-8) during daylight saving',
    excelFormula: '=(A1/86400)+25569-(9/24)',
    pitfalls: [
      'AKST switches to AKDT during summer',
      'One hour behind PST/PDT',
      'Alaska spans multiple timezones'
    ],
    introductionTemplate: 'business',
    relatedTimezones: ['AKDT', 'PST', 'HST'],
    geographicCoverage: 'Alaska Standard Time covers most of Alaska, one hour behind Pacific Time'
  },
  AKDT: {
    code: 'AKDT',
    fullName: 'Alaska Daylight Time',
    ianaName: 'America/Anchorage',
    utcOffset: '-08:00',
    utcOffsetHours: -8,
    observesDST: false,
    regions: ['United States (Alaska)'],
    businessContext: 'Alaskan summer operations',
    commonUseCases: [
      'Summer Alaska deployments',
      'Alaskan summer business hours',
      'Arctic summer timestamps'
    ],
    uniqueTimestamp: 1711972800,
    dstNotes: 'AKDT is the daylight saving version of AKST',
    excelFormula: '=(A1/86400)+25569-(8/24)',
    pitfalls: [
      'Only active during daylight saving period',
      'Reverts to AKST in November'
    ],
    introductionTemplate: 'business',
    relatedTimezones: ['AKST', 'PDT', 'HST'],
    geographicCoverage: 'Alaska Daylight Time applies to Alaska during summer months'
  },
  HST: {
    code: 'HST',
    fullName: 'Hawaii-Aleutian Standard Time',
    ianaName: 'Pacific/Honolulu',
    utcOffset: '-10:00',
    utcOffsetHours: -10,
    observesDST: false,
    regions: ['United States (Hawaii)'],
    businessContext: 'Hawaiian business operations',
    commonUseCases: [
      'Hawaii server logs',
      'Hawaiian business hours',
      'Pacific tourism timestamps'
    ],
    uniqueTimestamp: 1733832800,
    dstNotes: 'HST does not observe daylight saving time',
    excelFormula: '=(A1/86400)+25569-(10/24)',
    pitfalls: [
      'HST never changes—no DST to worry about',
      'Five hours behind EST, six behind EDT',
      'Hawaii stays on HST year-round'
    ],
    introductionTemplate: 'business',
    relatedTimezones: ['AKST', 'PST', 'GMT'],
    geographicCoverage: 'Hawaii-Aleutian Standard Time covers Hawaii and parts of the Aleutian Islands, with no daylight saving'
  },
  AST: {
    code: 'AST',
    fullName: 'Atlantic Standard Time',
    ianaName: 'America/Halifax',
    utcOffset: '-04:00',
    utcOffsetHours: -4,
    observesDST: true,
    dstCode: 'ADT',
    regions: ['Canada (Nova Scotia, New Brunswick)', 'Caribbean'],
    businessContext: 'Atlantic Canada business operations',
    commonUseCases: [
      'Atlantic Canada server logs',
      'Caribbean business hours',
      'Atlantic region timestamps'
    ],
    uniqueTimestamp: 1733832800,
    dstNotes: 'Switches to ADT (UTC-3) during daylight saving',
    excelFormula: '=(A1/86400)+25569-(4/24)',
    pitfalls: [
      'AST switches to ADT during summer',
      'One hour ahead of EST/EDT',
      'Nova Scotia and New Brunswick use AST/ADT'
    ],
    introductionTemplate: 'business',
    relatedTimezones: ['ADT', 'EST', 'GMT'],
    geographicCoverage: 'Atlantic Standard Time covers Atlantic Canada and parts of the Caribbean'
  },
  ADT: {
    code: 'ADT',
    fullName: 'Atlantic Daylight Time',
    ianaName: 'America/Halifax',
    utcOffset: '-03:00',
    utcOffsetHours: -3,
    observesDST: false,
    regions: ['Canada (Atlantic)'],
    businessContext: 'Atlantic Canada summer operations',
    commonUseCases: [
      'Summer Atlantic Canada deployments',
      'Atlantic summer business hours',
      'Summer Atlantic timestamps'
    ],
    uniqueTimestamp: 1711972800,
    dstNotes: 'ADT is the daylight saving version of AST',
    excelFormula: '=(A1/86400)+25569-(3/24)',
    pitfalls: [
      'Only active during daylight saving period',
      'Reverts to AST in November'
    ],
    introductionTemplate: 'business',
    relatedTimezones: ['AST', 'EDT', 'GMT'],
    geographicCoverage: 'Atlantic Daylight Time applies to Atlantic Canada during summer'
  },

  // Asian Timezones
  JST: {
    code: 'JST',
    fullName: 'Japan Standard Time',
    ianaName: 'Asia/Tokyo',
    utcOffset: '+09:00',
    utcOffsetHours: 9,
    observesDST: false,
    regions: ['Japan'],
    businessContext: 'Asian market coordination, Japan business protocol',
    commonUseCases: [
      'Japanese financial market timestamps',
      'Tokyo business hours',
      'Japan e-commerce analytics'
    ],
    uniqueTimestamp: 1733832800,
    dstNotes: 'JST does not observe daylight saving time',
    excelFormula: '=(A1/86400)+25569+(9/24)',
    pitfalls: [
      'JST never changes—no DST complexity',
      'Nine hours ahead of GMT',
      'Japan uses JST year-round'
    ],
    introductionTemplate: 'financial',
    relatedTimezones: ['KST', 'CST', 'AEST', 'IST'],
    geographicCoverage: 'Japan Standard Time covers all of Japan, from Hokkaido to Okinawa'
  },
  KST: {
    code: 'KST',
    fullName: 'Korea Standard Time',
    ianaName: 'Asia/Seoul',
    utcOffset: '+09:00',
    utcOffsetHours: 9,
    observesDST: false,
    regions: ['South Korea', 'North Korea'],
    businessContext: 'Korean business operations',
    commonUseCases: [
      'Korean financial transactions',
      'Seoul business hours',
      'Korea e-commerce timestamps'
    ],
    uniqueTimestamp: 1733832800,
    dstNotes: 'KST does not observe daylight saving time',
    excelFormula: '=(A1/86400)+25569+(9/24)',
    pitfalls: [
      'KST never changes—no DST',
      'Same offset as JST but different timezone',
      'South Korea uses KST year-round'
    ],
    introductionTemplate: 'business',
    relatedTimezones: ['JST', 'CST', 'AEST'],
    geographicCoverage: 'Korea Standard Time covers both North and South Korea'
  },
  // Note: CST is ambiguous (Central Standard Time vs China Standard Time)
  // Using CST_CN for China Standard Time to avoid conflict
  CST_CN: {
    code: 'CST',
    fullName: 'China Standard Time',
    ianaName: 'Asia/Shanghai',
    utcOffset: '+08:00',
    utcOffsetHours: 8,
    observesDST: false,
    regions: ['China'],
    businessContext: 'Chinese business operations',
    commonUseCases: [
      'Chinese financial transactions',
      'Shanghai business hours',
      'China e-commerce timestamps'
    ],
    uniqueTimestamp: 1733832800,
    dstNotes: 'CST (China) does not observe daylight saving time',
    excelFormula: '=(A1/86400)+25569+(8/24)',
    pitfalls: [
      'CST (China) never changes—no DST',
      'Different from CST (Central Standard Time in US)',
      'All of China uses single timezone despite size'
    ],
    introductionTemplate: 'business',
    relatedTimezones: ['JST', 'SGT', 'IST'],
    geographicCoverage: 'China Standard Time covers all of China, despite spanning five geographic timezones'
  },
  AEST: {
    code: 'AEST',
    fullName: 'Australian Eastern Standard Time',
    ianaName: 'Australia/Sydney',
    utcOffset: '+10:00',
    utcOffsetHours: 10,
    observesDST: true,
    dstCode: 'AEDT',
    regions: ['Australia (New South Wales, Victoria, Tasmania)'],
    businessContext: 'Australian compliance requirements, cross-Pacific collaboration',
    commonUseCases: [
      'Australian financial compliance',
      'Sydney business hours',
      'Cross-Pacific coordination'
    ],
    uniqueTimestamp: 1733832800,
    dstNotes: 'Switches to AEDT (UTC+11) from first Sunday in October to first Sunday in April',
    excelFormula: '=(A1/86400)+25569+(10/24)',
    pitfalls: [
      'AEST switches to AEDT during Australian summer (opposite hemisphere)',
      'DST dates are opposite of Northern Hemisphere',
      'Sydney and Melbourne use AEST/AEDT'
    ],
    introductionTemplate: 'compliance',
    relatedTimezones: ['AEDT', 'ACST', 'AWST', 'PST'],
    geographicCoverage: 'Australian Eastern Standard Time covers Sydney, Melbourne, and Canberra'
  },
  AEDT: {
    code: 'AEDT',
    fullName: 'Australian Eastern Daylight Time',
    ianaName: 'Australia/Sydney',
    utcOffset: '+11:00',
    utcOffsetHours: 11,
    observesDST: false,
    regions: ['Australia (Eastern)'],
    businessContext: 'Australian summer business operations',
    commonUseCases: [
      'Summer Australian deployments',
      'Sydney summer business hours',
      'Australian summer timestamps'
    ],
    uniqueTimestamp: 1711972800,
    dstNotes: 'AEDT is the daylight saving version of AEST (opposite season from Northern Hemisphere)',
    excelFormula: '=(A1/86400)+25569+(11/24)',
    pitfalls: [
      'Active during Australian summer (October to April)',
      'Opposite DST season from US/Europe',
      'Reverts to AEST in April'
    ],
    introductionTemplate: 'compliance',
    relatedTimezones: ['AEST', 'ACDT', 'PST'],
    geographicCoverage: 'Australian Eastern Daylight Time applies to Eastern Australia during summer'
  },
  ACST: {
    code: 'ACST',
    fullName: 'Australian Central Standard Time',
    ianaName: 'Australia/Adelaide',
    utcOffset: '+09:30',
    utcOffsetHours: 9.5,
    observesDST: true,
    dstCode: 'ACDT',
    regions: ['Australia (South Australia, Northern Territory)'],
    businessContext: 'Central Australian business operations',
    commonUseCases: [
      'Adelaide business hours',
      'Central Australian timestamps',
      'Australian mining operations'
    ],
    uniqueTimestamp: 1733832800,
    dstNotes: 'Switches to ACDT (UTC+10:30) during daylight saving (South Australia only, NT doesn\'t observe)',
    excelFormula: '=(A1/86400)+25569+(9.5/24)',
    pitfalls: [
      'ACST has half-hour offset like IST',
      'South Australia observes DST, Northern Territory does not',
      'Half-hour offset requires special handling'
    ],
    introductionTemplate: 'business',
    relatedTimezones: ['ACDT', 'AEST', 'AWST'],
    geographicCoverage: 'Australian Central Standard Time covers South Australia and Northern Territory'
  },
  ACDT: {
    code: 'ACDT',
    fullName: 'Australian Central Daylight Time',
    ianaName: 'Australia/Adelaide',
    utcOffset: '+10:30',
    utcOffsetHours: 10.5,
    observesDST: false,
    regions: ['Australia (South Australia)'],
    businessContext: 'Central Australian summer operations',
    commonUseCases: [
      'Summer Adelaide deployments',
      'South Australian summer business',
      'Summer Central Australian timestamps'
    ],
    uniqueTimestamp: 1711972800,
    dstNotes: 'ACDT is the daylight saving version of ACST (South Australia only)',
    excelFormula: '=(A1/86400)+25569+(10.5/24)',
    pitfalls: [
      'Only South Australia observes ACDT, not Northern Territory',
      'Active during Australian summer',
      'Reverts to ACST in April'
    ],
    introductionTemplate: 'business',
    relatedTimezones: ['ACST', 'AEDT', 'AWST'],
    geographicCoverage: 'Australian Central Daylight Time applies to South Australia during summer'
  },
  AWST: {
    code: 'AWST',
    fullName: 'Australian Western Standard Time',
    ianaName: 'Australia/Perth',
    utcOffset: '+08:00',
    utcOffsetHours: 8,
    observesDST: false,
    regions: ['Australia (Western Australia)'],
    businessContext: 'Western Australian business operations',
    commonUseCases: [
      'Perth business hours',
      'Western Australian mining timestamps',
      'WA e-commerce analytics'
    ],
    uniqueTimestamp: 1733832800,
    dstNotes: 'AWST does not observe daylight saving time',
    excelFormula: '=(A1/86400)+25569+(8/24)',
    pitfalls: [
      'AWST never changes—no DST',
      'Same offset as China Standard Time',
      'Perth uses AWST year-round'
    ],
    introductionTemplate: 'business',
    relatedTimezones: ['AEST', 'ACST', 'SGT'],
    geographicCoverage: 'Australian Western Standard Time covers Western Australia, including Perth'
  },

  // Middle East & Other Asian Timezones
  GST: {
    code: 'GST',
    fullName: 'Gulf Standard Time',
    ianaName: 'Asia/Dubai',
    utcOffset: '+04:00',
    utcOffsetHours: 4,
    observesDST: false,
    regions: ['United Arab Emirates', 'Oman'],
    businessContext: 'Gulf business operations',
    commonUseCases: [
      'UAE financial transactions',
      'Dubai business hours',
      'Gulf e-commerce timestamps'
    ],
    uniqueTimestamp: 1733832800,
    dstNotes: 'GST does not observe daylight saving time',
    excelFormula: '=(A1/86400)+25569+(4/24)',
    pitfalls: [
      'GST never changes—no DST',
      'Four hours ahead of GMT',
      'UAE and Oman use GST year-round'
    ],
    introductionTemplate: 'business',
    relatedTimezones: ['IST', 'MSK', 'SGT'],
    geographicCoverage: 'Gulf Standard Time covers UAE and Oman'
  },
  SGT: {
    code: 'SGT',
    fullName: 'Singapore Standard Time',
    ianaName: 'Asia/Singapore',
    utcOffset: '+08:00',
    utcOffsetHours: 8,
    observesDST: false,
    regions: ['Singapore', 'Malaysia'],
    businessContext: 'Southeast Asian business operations',
    commonUseCases: [
      'Singapore financial transactions',
      'Southeast Asian business hours',
      'Singapore e-commerce timestamps'
    ],
    uniqueTimestamp: 1733832800,
    dstNotes: 'SGT does not observe daylight saving time',
    excelFormula: '=(A1/86400)+25569+(8/24)',
    pitfalls: [
      'SGT never changes—no DST',
      'Same offset as China Standard Time',
      'Singapore and Malaysia use SGT year-round'
    ],
    introductionTemplate: 'business',
    relatedTimezones: ['IST', 'JST', 'CST', 'AWST'],
    geographicCoverage: 'Singapore Standard Time covers Singapore and Malaysia'
  },
  ICT: {
    code: 'ICT',
    fullName: 'Indochina Time',
    ianaName: 'Asia/Bangkok',
    utcOffset: '+07:00',
    utcOffsetHours: 7,
    observesDST: false,
    regions: ['Thailand', 'Vietnam', 'Cambodia', 'Laos'],
    businessContext: 'Southeast Asian business operations',
    commonUseCases: [
      'Thailand business hours',
      'Southeast Asian e-commerce',
      'Indochina region timestamps'
    ],
    uniqueTimestamp: 1733832800,
    dstNotes: 'ICT does not observe daylight saving time',
    excelFormula: '=(A1/86400)+25569+(7/24)',
    pitfalls: [
      'ICT never changes—no DST',
      'Seven hours ahead of GMT',
      'Thailand, Vietnam, Cambodia use ICT'
    ],
    introductionTemplate: 'business',
    relatedTimezones: ['SGT', 'IST', 'CST'],
    geographicCoverage: 'Indochina Time covers Thailand, Vietnam, Cambodia, and Laos'
  },
  CXT: {
    code: 'CXT',
    fullName: 'Christmas Island Time',
    ianaName: 'Indian/Christmas',
    utcOffset: '+07:00',
    utcOffsetHours: 7,
    observesDST: false,
    regions: ['Christmas Island'],
    businessContext: 'Christmas Island operations',
    commonUseCases: [
      'Christmas Island timestamps',
      'Indian Ocean region logging',
      'Remote island operations'
    ],
    uniqueTimestamp: 1733832800,
    dstNotes: 'CXT does not observe daylight saving time',
    excelFormula: '=(A1/86400)+25569+(7/24)',
    pitfalls: [
      'CXT never changes—no DST',
      'Same offset as ICT',
      'Christmas Island uses CXT year-round'
    ],
    introductionTemplate: 'business',
    relatedTimezones: ['AWST', 'SGT', 'ICT'],
    geographicCoverage: 'Christmas Island Time covers Christmas Island in the Indian Ocean'
  },
  WST: {
    code: 'WST',
    fullName: 'Western Standard Time',
    ianaName: 'Australia/Perth',
    utcOffset: '+08:00',
    utcOffsetHours: 8,
    observesDST: false,
    regions: ['Australia (Western Australia)'],
    businessContext: 'Western Australian business operations',
    commonUseCases: [
      'Perth business hours',
      'Western Australian timestamps',
      'WA mining operations'
    ],
    uniqueTimestamp: 1733832800,
    dstNotes: 'WST (Western Australia) does not observe daylight saving time',
    excelFormula: '=(A1/86400)+25569+(8/24)',
    pitfalls: [
      'WST never changes—no DST',
      'Same as AWST (different name)',
      'Perth uses WST year-round'
    ],
    introductionTemplate: 'business',
    relatedTimezones: ['AWST', 'ACST', 'AEST'],
    geographicCoverage: 'Western Standard Time covers Western Australia'
  },
  NZT: {
    code: 'NZT',
    fullName: 'New Zealand Standard Time',
    ianaName: 'Pacific/Auckland',
    utcOffset: '+12:00',
    utcOffsetHours: 12,
    observesDST: true,
    dstCode: 'NZDT',
    regions: ['New Zealand'],
    businessContext: 'New Zealand business operations',
    commonUseCases: [
      'New Zealand financial transactions',
      'Auckland business hours',
      'NZ e-commerce timestamps'
    ],
    uniqueTimestamp: 1733832800,
    dstNotes: 'Switches to NZDT (UTC+13) from last Sunday in September to first Sunday in April',
    excelFormula: '=(A1/86400)+25569+(12/24)',
    pitfalls: [
      'NZT switches to NZDT during New Zealand summer',
      'DST dates opposite of Northern Hemisphere',
      'Auckland and Wellington use NZT/NZDT'
    ],
    introductionTemplate: 'business',
    relatedTimezones: ['NZDT', 'AEST', 'AEDT'],
    geographicCoverage: 'New Zealand Standard Time covers all of New Zealand'
  },
  NZDT: {
    code: 'NZDT',
    fullName: 'New Zealand Daylight Time',
    ianaName: 'Pacific/Auckland',
    utcOffset: '+13:00',
    utcOffsetHours: 13,
    observesDST: false,
    regions: ['New Zealand'],
    businessContext: 'New Zealand summer operations',
    commonUseCases: [
      'Summer New Zealand deployments',
      'NZ summer business hours',
      'New Zealand summer timestamps'
    ],
    uniqueTimestamp: 1711972800,
    dstNotes: 'NZDT is the daylight saving version of NZT',
    excelFormula: '=(A1/86400)+25569+(13/24)',
    pitfalls: [
      'Active during New Zealand summer (September to April)',
      'Opposite DST season from Northern Hemisphere',
      'Reverts to NZT in April'
    ],
    introductionTemplate: 'business',
    relatedTimezones: ['NZT', 'AEDT', 'CHADT'],
    geographicCoverage: 'New Zealand Daylight Time applies to New Zealand during summer'
  },
  CHAST: {
    code: 'CHAST',
    fullName: 'Chatham Standard Time',
    ianaName: 'Pacific/Chatham',
    utcOffset: '+12:45',
    utcOffsetHours: 12.75,
    observesDST: true,
    dstCode: 'CHADT',
    regions: ['New Zealand (Chatham Islands)'],
    businessContext: 'Chatham Islands operations',
    commonUseCases: [
      'Chatham Islands timestamps',
      'Remote NZ region logging',
      'Pacific island operations'
    ],
    uniqueTimestamp: 1733832800,
    dstNotes: 'Switches to CHADT (UTC+13:45) during daylight saving',
    excelFormula: '=(A1/86400)+25569+(12.75/24)',
    pitfalls: [
      'CHAST has 45-minute offset—unique in the world',
      'Switches to CHADT during summer',
      'Chatham Islands use CHAST/CHADT'
    ],
    introductionTemplate: 'business',
    relatedTimezones: ['NZT', 'NZDT'],
    geographicCoverage: 'Chatham Standard Time covers the Chatham Islands, 45 minutes ahead of New Zealand'
  },
  CHADT: {
    code: 'CHADT',
    fullName: 'Chatham Daylight Time',
    ianaName: 'Pacific/Chatham',
    utcOffset: '+13:45',
    utcOffsetHours: 13.75,
    observesDST: false,
    regions: ['New Zealand (Chatham Islands)'],
    businessContext: 'Chatham Islands summer operations',
    commonUseCases: [
      'Summer Chatham Islands timestamps',
      'Chatham summer operations',
      'Summer Pacific island logging'
    ],
    uniqueTimestamp: 1711972800,
    dstNotes: 'CHADT is the daylight saving version of CHAST',
    excelFormula: '=(A1/86400)+25569+(13.75/24)',
    pitfalls: [
      'Only active during daylight saving period',
      '45-minute offset requires special handling',
      'Reverts to CHAST in April'
    ],
    introductionTemplate: 'business',
    relatedTimezones: ['CHAST', 'NZDT'],
    geographicCoverage: 'Chatham Daylight Time applies to Chatham Islands during summer'
  },
  TOT: {
    code: 'TOT',
    fullName: 'Tonga Time',
    ianaName: 'Pacific/Tongatapu',
    utcOffset: '+13:00',
    utcOffsetHours: 13,
    observesDST: false,
    regions: ['Tonga'],
    businessContext: 'Tongan operations',
    commonUseCases: [
      'Tonga timestamps',
      'Pacific island logging',
      'Remote Pacific operations'
    ],
    uniqueTimestamp: 1733832800,
    dstNotes: 'TOT does not observe daylight saving time',
    excelFormula: '=(A1/86400)+25569+(13/24)',
    pitfalls: [
      'TOT never changes—no DST',
      'Thirteen hours ahead of GMT',
      'Tonga uses TOT year-round'
    ],
    introductionTemplate: 'business',
    relatedTimezones: ['NZDT', 'CHADT'],
    geographicCoverage: 'Tonga Time covers the Kingdom of Tonga'
  },
  LINT: {
    code: 'LINT',
    fullName: 'Line Islands Time',
    ianaName: 'Pacific/Kiritimati',
    utcOffset: '+14:00',
    utcOffsetHours: 14,
    observesDST: false,
    regions: ['Kiribati (Line Islands)'],
    businessContext: 'Line Islands operations',
    commonUseCases: [
      'Line Islands timestamps',
      'Pacific remote logging',
      'First timezone to see new day'
    ],
    uniqueTimestamp: 1733832800,
    dstNotes: 'LINT does not observe daylight saving time',
    excelFormula: '=(A1/86400)+25569+(14/24)',
    pitfalls: [
      'LINT never changes—no DST',
      'Fourteen hours ahead of GMT—first to see new day',
      'Line Islands use LINT year-round'
    ],
    introductionTemplate: 'business',
    relatedTimezones: ['TOT', 'NZDT'],
    geographicCoverage: 'Line Islands Time covers Kiribati\'s Line Islands, the first timezone to see each new day'
  },
  MIT: {
    code: 'MIT',
    fullName: 'Marquesas Islands Time',
    ianaName: 'Pacific/Marquesas',
    utcOffset: '-09:30',
    utcOffsetHours: -9.5,
    observesDST: false,
    regions: ['French Polynesia (Marquesas)'],
    businessContext: 'Marquesas operations',
    commonUseCases: [
      'Marquesas timestamps',
      'French Polynesia logging',
      'Remote Pacific operations'
    ],
    uniqueTimestamp: 1733832800,
    dstNotes: 'MIT does not observe daylight saving time',
    excelFormula: '=(A1/86400)+25569-(9.5/24)',
    pitfalls: [
      'MIT never changes—no DST',
      'Half-hour offset requires special handling',
      'Marquesas Islands use MIT year-round'
    ],
    introductionTemplate: 'business',
    relatedTimezones: ['HST', 'AKST'],
    geographicCoverage: 'Marquesas Islands Time covers the Marquesas Islands in French Polynesia'
  }
};

// Get all timezone codes for URL routing
export const getAllTimezoneCodes = (): string[] => {
  return Object.values(TIMEZONE_CONFIGS).map(config => {
    // Handle special case: CST_CN (China Standard Time)
    if (config.code === 'CST' && config.ianaName === 'Asia/Shanghai') {
      return 'cst-cn'; // Use cst-cn for China to avoid conflict with US CST
    }
    return config.code.toLowerCase();
  });
};

// Get timezone config by code
// Handles both direct key lookup and code-based lookup
export const getTimezoneConfig = (code: string): TimezoneConfig | undefined => {
  const lowerCode = code.toLowerCase();
  const upperCode = code.toUpperCase();
  
  // Handle special case: cst-cn for China Standard Time (from URL)
  if (lowerCode === 'cst-cn' || lowerCode === 'cstcn') {
    return TIMEZONE_CONFIGS['CST_CN'];
  }
  
  // Direct key lookup
  if (TIMEZONE_CONFIGS[upperCode]) {
    return TIMEZONE_CONFIGS[upperCode];
  }
  
  // Code-based lookup (find by timezone code property)
  for (const [key, config] of Object.entries(TIMEZONE_CONFIGS)) {
    if (config.code.toUpperCase() === upperCode) {
      // If multiple matches (like CST), prefer US CST over China CST
      if (upperCode === 'CST' && key === 'CST_CN') {
        continue; // Skip CST_CN, prefer US CST for plain "cst"
      }
      return config;
    }
  }
  
  return undefined;
};

// Get related timezones for internal linking
export const getRelatedTimezones = (code: string, limit: number = 5): TimezoneConfig[] => {
  const config = getTimezoneConfig(code);
  if (!config) return [];
  
  const related = config.relatedTimezones
    .map(tz => getTimezoneConfig(tz))
    .filter((tz): tz is TimezoneConfig => tz !== undefined)
    .slice(0, limit);
  
  return related;
};

// Get popular timezones for navigation
export const getPopularTimezones = (): TimezoneConfig[] => {
  const popularCodes = ['IST', 'EST', 'PST', 'GMT', 'JST', 'AEST', 'CET', 'BST'];
  return popularCodes
    .map(code => getTimezoneConfig(code))
    .filter((tz): tz is TimezoneConfig => tz !== undefined);
};

// Get all timezones grouped by region
export const getTimezonesByRegion = (): Record<string, TimezoneConfig[]> => {
  const regions: Record<string, TimezoneConfig[]> = {
    'US & Canada': [],
    'Europe': [],
    'Asia': [],
    'Australia & Pacific': [],
    'Middle East & Other': []
  };

  Object.values(TIMEZONE_CONFIGS).forEach(config => {
    if (config.regions.some(r => r.includes('United States') || r.includes('Canada'))) {
      regions['US & Canada'].push(config);
    } else if (config.regions.some(r => r.includes('Europe') || r.includes('United Kingdom') || r.includes('France') || r.includes('Germany'))) {
      regions['Europe'].push(config);
    } else if (config.regions.some(r => r.includes('Asia') || r.includes('Japan') || r.includes('China') || r.includes('India'))) {
      regions['Asia'].push(config);
    } else if (config.regions.some(r => r.includes('Australia') || r.includes('New Zealand') || r.includes('Pacific'))) {
      regions['Australia & Pacific'].push(config);
    } else {
      regions['Middle East & Other'].push(config);
    }
  });

  return regions;
};

