import { DateTime } from 'luxon';

export function nowISO() {
  return DateTime.now().toISO() || '';
}

export function getCurrentDate() {
  const now = DateTime.now();
  const formattedDate = now.toFormat('yyyy-MM-dd');
  return formattedDate;
}

export function displayLocaleDate(ts) {
  const dateObj = DateTime.fromISO(ts);
  const dateString = dateObj.toFormat('D t');
  return dateString;
}

export function formatYearMonth(date) {
  const year = date.getFullYear().toString();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  return `${year}-${month}`;
}
