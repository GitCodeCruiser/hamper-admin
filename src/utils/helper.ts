import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';

dayjs.extend(advancedFormat);

export const formatToOrdinalDate = (dateStr?: string | null): string => {
  if (!dateStr) return '';
  return dayjs(dateStr).format('Do MMM, YYYY');
};
