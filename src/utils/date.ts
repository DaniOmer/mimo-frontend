import { format, addMinutes } from 'date-fns';

const timeZone = 'Europe/Paris';

function getTimeZoneOffset(date: Date, timeZone: string): number {
  const localDate = new Date(date);
  const targetTime = new Date(date.toLocaleString('en-US', { timeZone }));
  const diff = (targetTime.getTime() - localDate.getTime()) / 60000;
  return -diff;
}

function formatInTimeZone(date: Date, timeZone: string, formatStr: string): string {
  const offset = getTimeZoneOffset(date, timeZone);
  const adjustedDate = addMinutes(date, offset);
  return format(adjustedDate, formatStr);
}

export function formatDate(date: Date): string {
  return formatInTimeZone(date, timeZone, 'yyyy-MM-dd');
}

export function formatTime(date: Date): string {
  return formatInTimeZone(date, timeZone, 'HH:mm:ss');
}

export function formatDateTime(date: Date, isSecond = true): string {
  return isSecond
    ? formatInTimeZone(date, timeZone, 'yyyy-MM-dd HH:mm:ss')
    : formatInTimeZone(date, timeZone, 'yyyy-MM-dd HH:mm');
}

