import dayjs from 'dayjs';

export function convertDate(date?: string): string {
  if (!date) return '';
  return dayjs(date, 'YYYY-MM-DDTHH:mm:ss').format('YYYY-MM-DD HH:mm:ss');
}
