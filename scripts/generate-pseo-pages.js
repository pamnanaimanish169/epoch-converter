import fs from 'fs';
import path from 'path';

const PROJECT_ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const CSV_PATH = path.join(PROJECT_ROOT, 'data', 'dates.csv');
const OUTPUT_TS_PATH = path.join(PROJECT_ROOT, 'src', 'data', 'pseoDates.ts');
const SITEMAP_PATH = path.join(PROJECT_ROOT, 'public', 'sitemap.xml');

const START_DATE = '2026-03-25';
const END_CORE = '2026-12-31';
const END_EXTENSION = '2027-06-30';
const MAX_PAGES = 200;
const CORE_TARGET = 180;
const EXT_TARGET = 20;
const MONTH_HUB_START = '2026-03';
const MONTH_HUB_END = '2026-12';
const BASE_URL = 'https://epoch-tools.com';

const HOLIDAYS_2026 = new Set([
  '2026-07-04',
  '2026-09-15',
  '2026-10-31',
  '2026-12-25',
  '2026-12-31',
]);

const HOLIDAYS_2027 = new Set([
  '2027-01-01',
]);

function rangeDates(startDate, endDate) {
  const [sy, sm, sd] = startDate.split('-').map(Number);
  const [ey, em, ed] = endDate.split('-').map(Number);
  const start = new Date(Date.UTC(sy, sm - 1, sd));
  const end = new Date(Date.UTC(ey, em - 1, ed));
  const out = [];
  for (let d = new Date(start); d <= end; d = new Date(d.getTime() + 24 * 60 * 60 * 1000)) {
    out.push(
      `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, '0')}-${String(d.getUTCDate()).padStart(2, '0')}`,
    );
  }
  return out;
}

const FORCE_INCLUDE = new Set([
  ...rangeDates('2026-03-25', '2026-03-31'),
  ...rangeDates('2026-04-01', '2026-04-30'),
  ...rangeDates('2026-05-01', '2026-06-30'),
  '2026-07-01',
  '2026-10-01',
  ...Array.from(HOLIDAYS_2026),
  '2027-01-01',
]);

function parseCSVDates(content) {
  return content
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .filter((line) => /^\d{4}-\d{2}-\d{2}$/.test(line));
}

function monthFromDate(dateStr) {
  return dateStr.slice(0, 7);
}

function isMonthStart(dateStr) {
  return dateStr.endsWith('-01');
}

function isQuarterStart(dateStr) {
  return dateStr.endsWith('-01') && ['01', '04', '07', '10'].includes(dateStr.slice(5, 7));
}

function isMonthEnd(dateStr) {
  const [year, month, day] = dateStr.split('-').map(Number);
  const candidate = new Date(Date.UTC(year, month - 1, day));
  const nextDay = new Date(candidate.getTime() + 24 * 60 * 60 * 1000);
  return nextDay.getUTCDate() === 1;
}

function dayOfWeek(dateStr) {
  const [year, month, day] = dateStr.split('-').map(Number);
  return new Date(Date.UTC(year, month - 1, day)).getUTCDay();
}

function scoreDate(dateStr) {
  let score = 0;
  const month = monthFromDate(dateStr);
  const weekday = dayOfWeek(dateStr);

  if (dateStr >= '2026-12-01' && dateStr <= '2026-12-31') score += 120;
  if (dateStr >= '2026-11-01' && dateStr <= '2026-11-30') score += 80;
  if (dateStr >= '2026-10-01' && dateStr <= '2026-10-31') score += 60;
  if (dateStr >= '2026-09-01' && dateStr <= '2026-09-30') score += 45;
  if (dateStr >= '2026-07-01' && dateStr <= '2026-08-31') score += 35;
  if (month >= '2026-03' && month <= '2026-06') score += 30;

  if (HOLIDAYS_2026.has(dateStr) || HOLIDAYS_2027.has(dateStr)) score += 120;
  if (isQuarterStart(dateStr)) score += 95;
  if (isMonthStart(dateStr)) score += 55;
  if (isMonthEnd(dateStr)) score += 45;
  if (weekday === 1 || weekday === 2 || weekday === 3) score += 15;

  const isGscLike =
    HOLIDAYS_2026.has(dateStr) ||
    HOLIDAYS_2027.has(dateStr) ||
    isQuarterStart(dateStr) ||
    isMonthStart(dateStr) ||
    isMonthEnd(dateStr) ||
    dateStr >= '2026-12-01';
  if (isGscLike) score += 20;

  return { score, isGscLike };
}

function dedupeSorted(dates) {
  return Array.from(new Set(dates)).sort();
}

function expandDateRange(minDate, maxDate) {
  const out = [];
  const [startY, startM, startD] = minDate.split('-').map(Number);
  const [endY, endM, endD] = maxDate.split('-').map(Number);
  const start = new Date(Date.UTC(startY, startM - 1, startD));
  const end = new Date(Date.UTC(endY, endM - 1, endD));
  for (let d = new Date(start); d <= end; d = new Date(d.getTime() + 24 * 60 * 60 * 1000)) {
    out.push(
      `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, '0')}-${String(d.getUTCDate()).padStart(2, '0')}`,
    );
  }
  return out;
}

function selectDates(allDates) {
  const filtered = allDates.filter((d) => d >= START_DATE && d <= END_EXTENSION);
  const core = filtered.filter((d) => d <= END_CORE);
  const extension = filtered.filter((d) => d > END_CORE);

  const scoredCore = core
    .map((date) => ({ date, ...scoreDate(date) }))
    .sort((a, b) => (b.score - a.score) || a.date.localeCompare(b.date));
  const scoredExt = extension
    .map((date) => ({ date, ...scoreDate(date) }))
    .sort((a, b) => (b.score - a.score) || a.date.localeCompare(b.date));

  const forcedCore = core.filter((d) => FORCE_INCLUDE.has(d));
  const forcedExt = extension.filter((d) => FORCE_INCLUDE.has(d));

  const selectedCore = [
    ...forcedCore.map((date) => ({ date, ...scoreDate(date) })),
    ...scoredCore.filter((d) => !forcedCore.includes(d.date)).slice(0, Math.max(0, CORE_TARGET - forcedCore.length)),
  ];
  const selectedExt = [
    ...forcedExt.map((date) => ({ date, ...scoreDate(date) })),
    ...scoredExt.filter((d) => !forcedExt.includes(d.date)).slice(0, Math.max(0, EXT_TARGET - forcedExt.length)),
  ];
  let selected = [...selectedCore, ...selectedExt];

  selected = selected.sort((a, b) => a.date.localeCompare(b.date)).slice(0, MAX_PAGES);
  return selected;
}

function buildMonthHubs() {
  const hubs = [];
  let current = MONTH_HUB_START;
  while (current <= MONTH_HUB_END) {
    hubs.push(current);
    const [year, month] = current.split('-').map(Number);
    const next = new Date(Date.UTC(year, month, 1));
    current = `${next.getUTCFullYear()}-${String(next.getUTCMonth() + 1).padStart(2, '0')}`;
  }
  return hubs;
}

function writeTsFile(selectedEntries, monthHubs) {
  const rows = selectedEntries
    .map((entry) => `  { date: "${entry.date}", isGscLike: ${entry.isGscLike ? 'true' : 'false'} },`)
    .join('\n');
  const hubs = monthHubs.map((m) => `  "${m}",`).join('\n');

  const content = `/* Auto-generated by scripts/generate-pseo-pages.js */
export interface PseoDateEntry {
  date: string;
  isGscLike: boolean;
}

export const PSEO_GENERATED_AT = "${new Date().toISOString()}";
export const PSEO_START_DATE = "${START_DATE}";
export const PSEO_MAX_DAILY_PAGES = ${MAX_PAGES};

export const PSEO_DAILY_DATES: PseoDateEntry[] = [
${rows}
];

export const PSEO_MONTH_HUBS: string[] = [
${hubs}
];
`;

  fs.mkdirSync(path.dirname(OUTPUT_TS_PATH), { recursive: true });
  fs.writeFileSync(OUTPUT_TS_PATH, content, 'utf8');
}

function writeSitemap(selectedEntries, monthHubs) {
  const staticUrls = ['/', '/about', '/faq', '/week-number', '/epoch-countdown', '/unix-countdown', '/timezones'];
  const staticBlocks = staticUrls
    .map(
      (url) => `<url><loc>${BASE_URL}${url}</loc><changefreq>weekly</changefreq><priority>0.7</priority></url>`,
    )
    .join('');

  const dailyBlocks = selectedEntries
    .map((entry) => {
      const priority = entry.isGscLike ? '1.0' : '0.8';
      return `<url><loc>${BASE_URL}/unix-timestamp/${entry.date}</loc><changefreq>weekly</changefreq><priority>${priority}</priority></url>`;
    })
    .join('');

  const monthBlocks = monthHubs
    .map(
      (month) =>
        `<url><loc>${BASE_URL}/unix-timestamps/${month}</loc><changefreq>weekly</changefreq><priority>0.8</priority></url>`,
    )
    .join('');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${staticBlocks}${dailyBlocks}${monthBlocks}</urlset>`;

  fs.mkdirSync(path.dirname(SITEMAP_PATH), { recursive: true });
  fs.writeFileSync(SITEMAP_PATH, xml, 'utf8');
}

function validateCSVRange(dates) {
  const minDate = dates[0];
  const maxDate = dates[dates.length - 1];
  if (!minDate || !maxDate) {
    throw new Error('dates.csv is empty or invalid.');
  }
  if (minDate > START_DATE) {
    throw new Error(`dates.csv must include ${START_DATE} or earlier dates.`);
  }
  if (maxDate < END_EXTENSION) {
    throw new Error(`dates.csv must include dates through ${END_EXTENSION}.`);
  }
}

function main() {
  if (!fs.existsSync(CSV_PATH)) {
    throw new Error(`Missing CSV input at ${CSV_PATH}`);
  }
  const csv = fs.readFileSync(CSV_PATH, 'utf8');
  const parsed = parseCSVDates(csv);
  const compactDates = dedupeSorted(parsed);
  const dates = expandDateRange(compactDates[0], compactDates[compactDates.length - 1]);
  validateCSVRange(dates);

  const selectedEntries = selectDates(dates);
  const monthHubs = buildMonthHubs();
  writeTsFile(selectedEntries, monthHubs);
  writeSitemap(selectedEntries, monthHubs);

  const sampleDates = ['2026-03-25', '2026-12-10', '2027-01-01'];
  const found = sampleDates.map((d) => selectedEntries.some((x) => x.date === d));
  console.log(
    JSON.stringify(
      {
        dailyPages: selectedEntries.length,
        monthHubs: monthHubs.length,
        sampleChecks: Object.fromEntries(sampleDates.map((d, idx) => [d, found[idx]])),
      },
      null,
      2,
    ),
  );
}

main();
