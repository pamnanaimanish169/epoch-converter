export type TimeUnit = 'seconds' | 'milliseconds' | 'microseconds';

export interface ConversionResult {
  epoch: number;
  utcDate: string;
  localDate: string;
  unit: TimeUnit;
}

export interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}
