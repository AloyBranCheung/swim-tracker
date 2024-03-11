import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

export const dateFormatter = (date: string | number | Date) => dayjs.utc(date).local().format('YYYY-MM-DD hh:mma')