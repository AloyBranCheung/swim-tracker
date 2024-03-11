import * as dayjs from 'dayjs'

export const dateFormatter = (date: string | number | Date) => dayjs(date).format('YYYY-MM-DD hh:mma')