export const PSEO_NOW_REFERENCE = '2026-03-25';

const DAY_MS = 24 * 60 * 60 * 1000;

export function parseIsoDateUTC(date: string): Date {
  const [year, month, day] = date.split('-').map(Number);
  return new Date(Date.UTC(year, month - 1, day, 0, 0, 0));
}

export function isValidIsoDate(date: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return false;
  const utc = parseIsoDateUTC(date);
  return utc.toISOString().startsWith(date);
}

export function isValidMonth(month: string): boolean {
  if (!/^\d{4}-\d{2}$/.test(month)) return false;
  const [year, m] = month.split('-').map(Number);
  return year >= 1970 && m >= 1 && m <= 12;
}

export function getUnixSeconds(date: string): number {
  return Math.floor(parseIsoDateUTC(date).getTime() / 1000);
}

export function getWeekday(date: string): string {
  return parseIsoDateUTC(date).toLocaleDateString('en-US', { weekday: 'long', timeZone: 'UTC' });
}

export function getDaysAhead(date: string): number {
  const target = parseIsoDateUTC(date).getTime();
  const now = new Date();
  const nowUtc = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
  return Math.ceil((target - nowUtc) / DAY_MS);
}

export function getDaysAheadFromReference(date: string): number {
  const target = parseIsoDateUTC(date).getTime();
  const reference = parseIsoDateUTC(PSEO_NOW_REFERENCE).getTime();
  return Math.round((target - reference) / DAY_MS);
}

export function getMonthlyDateRange(month: string): { start: string; end: string } {
  const [year, m] = month.split('-').map(Number);
  const start = new Date(Date.UTC(year, m - 1, 1));
  const end = new Date(Date.UTC(year, m, 0));
  const toIso = (d: Date) =>
    `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, '0')}-${String(d.getUTCDate()).padStart(2, '0')}`;
  return { start: toIso(start), end: toIso(end) };
}

export function getSeasonalUseCase(date: string): string {
  const month = Number(date.slice(5, 7));
  if (month >= 10 && month <= 12) return 'holiday APIs, Black Friday log analysis, and year-end releases';
  if (month >= 7 && month <= 9) return 'Q3 planning, fiscal checkpoint jobs, and deployment timelines';
  if (month >= 4 && month <= 6) return 'Q2 sprint planning, API contract rollout, and analytics cutovers';
  return 'new-year planning, fiscal transitions, and production migration windows';
}

export function getWeekdayHint(date: string): string {
  const weekday = getWeekday(date);
  const hints: Record<string, string> = {
    Monday: 'start-of-week release planning window',
    Tuesday: 'mid-week deploy window',
    Wednesday: 'stable sprint execution day',
    Thursday: 'pre-release verification window',
    Friday: 'end-of-week reporting and audits',
    Saturday: 'maintenance and low-traffic job window',
    Sunday: 'week boundary scheduling checkpoint',
  };
  return `${weekday} - ${hints[weekday] ?? 'planning window'}`;
}

export function formatHumanDate(date: string): string {
  return parseIsoDateUTC(date).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  });
}

export function getTimezoneRows(epochSeconds: number) {
  const zones = [
    { label: 'UTC', zone: 'UTC' },
    { label: 'America/New_York', zone: 'America/New_York' },
    { label: 'America/Los_Angeles', zone: 'America/Los_Angeles' },
    { label: 'Europe/London', zone: 'Europe/London' },
    { label: 'Asia/Kolkata', zone: 'Asia/Kolkata' },
    { label: 'Asia/Tokyo', zone: 'Asia/Tokyo' },
  ];
  return zones.map(({ label, zone }) => ({
    label,
    value: new Date(epochSeconds * 1000).toLocaleString('en-US', {
      timeZone: zone,
      hour12: false,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    }),
  }));
}
