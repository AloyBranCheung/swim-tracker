import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

export const dateFormatter = (date: string | number | Date) => dayjs.utc(date).local().format('YYYY-MM-DD hh:mma')

export const isNextDay = (lastTime: Date | dayjs.Dayjs) => {
    // right now uses local time (client or server) 
    const markTime = dayjs(lastTime)
    const currTime = dayjs(new Date())
    const markTimeNext = markTime.add(1, 'day').startOf('day')

    return currTime.isAfter(markTimeNext)
}