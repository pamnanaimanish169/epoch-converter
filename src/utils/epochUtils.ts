import { TimeUnit } from '../types';

export const detectTimeUnit = (epoch: number): TimeUnit => {
  const epochStr = Math.abs(epoch).toString();

  if (epochStr.length <= 10) {
    return 'seconds';
  } else if (epochStr.length <= 13) {
    return 'milliseconds';
  } else {
    return 'microseconds';
  }
};

export const normalizeToMilliseconds = (epoch: number, unit: TimeUnit): number => {
  switch (unit) {
    case 'seconds':
      return epoch * 1000;
    case 'milliseconds':
      return epoch;
    case 'microseconds':
      return epoch / 1000;
    default:
      return epoch;
  }
};

export const convertFromMilliseconds = (ms: number, targetUnit: TimeUnit): number => {
  switch (targetUnit) {
    case 'seconds':
      return Math.floor(ms / 1000);
    case 'milliseconds':
      return Math.floor(ms);
    case 'microseconds':
      return Math.floor(ms * 1000);
    default:
      return ms;
  }
};

export const formatDateTimeString = (date: Date, isUTC: boolean = false): string => {
  // Check if date is valid
  if (isNaN(date.getTime())) {
    return '';
  }
  
  if (isUTC) {
    return date.toISOString().replace('T', ' ').replace('Z', ' UTC');
  }

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  const tzOffset = -date.getTimezoneOffset();
  const tzHours = Math.floor(Math.abs(tzOffset) / 60);
  const tzMinutes = Math.abs(tzOffset) % 60;
  const tzSign = tzOffset >= 0 ? '+' : '-';
  const timezone = `GMT${tzSign}${String(tzHours).padStart(2, '0')}:${String(tzMinutes).padStart(2, '0')}`;

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds} ${timezone}`;
};

export const parseDateTimeString = (dateStr: string): number | null => {
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) {
    return null;
  }
  return date.getTime();
};

export const isValidEpoch = (epoch: number): boolean => {
  if (isNaN(epoch) || !isFinite(epoch)) return false;

  const unit = detectTimeUnit(epoch);
  const ms = normalizeToMilliseconds(epoch, unit);

  // Allow a wider range of dates, including before 1970
  const minDate = new Date('1900-01-01').getTime();
  const maxDate = new Date('2100-12-31').getTime();

  return ms >= minDate && ms <= maxDate;
};

export const getCurrentEpoch = (unit: TimeUnit): number => {
  const now = Date.now();
  return convertFromMilliseconds(now, unit);
};

export const getTimezones = (): string[] => {
  return (Intl as any).supportedValuesOf('timeZone');
};

export const cleanEpochInput = (input: string): string => {
  // Remove common suffixes and invalid characters
  return input
    .replace(/[Ss]$/, '') // Remove 'S' or 's' suffix
    .replace(/[^0-9.-]/, '') // Keep only digits, dots, and minus sign
    .trim();
};

/**
 * Get the ISO week number for a given date
 * ISO 8601 week numbering: Week 1 is the week with the year's first Thursday
 */
export const getWeekNumber = (date: Date = new Date()): number => {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
};

/**
 * Get the current week number
 */
export const getCurrentWeekNumber = (): number => {
  return getWeekNumber(new Date());
};
