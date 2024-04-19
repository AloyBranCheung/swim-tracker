import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc';
import tz from 'dayjs/plugin/timezone'

dayjs.extend(utc);
dayjs.extend(tz);

export const dateFormatter = (date: string | number | Date) => dayjs.utc(date).local().format('YYYY-MM-DD hh:mma')

export const isNextDay = (lastTime: Date | dayjs.Dayjs, userLocalTimezone?: string) => {
    let markTime;
    markTime = dayjs(lastTime)
    if (userLocalTimezone && userLocalTimezone?.length > 0) {
        markTime = dayjs(lastTime).tz(userLocalTimezone)
    }
    const currTime = dayjs(new Date())
    const markTimeNext = markTime.add(1, 'day').startOf('day')

    return currTime.isAfter(markTimeNext)
}