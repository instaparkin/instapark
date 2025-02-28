import dayjs from "dayjs"
import localizedFormat from 'dayjs/plugin/localizedFormat'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(localizedFormat);
dayjs.extend(relativeTime);

export const unixSecToMonthYear = (dateInUnixSeconds: number) => {
    return dayjs.unix(dateInUnixSeconds).format("ll")
}

export const unixSecToMonthYearTime = (dateInUnixSeconds: number) => {
    return dayjs.unix(dateInUnixSeconds).format("lll")
}


export const dateToMonthYearTime = (date: Date) => {
    return dayjs(date).format("lll")
}

export const unixSecToISO = (dateInUnixSeconds: number): Date => {
    return new Date(dayjs.unix(dateInUnixSeconds).toISOString())
}

export const dateToUnixSec = (date: Date) => {
    return dayjs(date).unix()
}

export const timeInInstapark = (dateInUnixSeconds: number, user: boolean = true) => {
    const date = unixSecToISO(dateInUnixSeconds)
    return (user ? "Joined " : "") + dayjs(date).fromNow()
}

export const getStartAndEndDates = (selectedDate: Date) => {
    const startOfDay = new Date(
        selectedDate.getFullYear(),
        selectedDate.getMonth(),
        selectedDate.getDate()
    );
    const startUnix = dateToUnixSec(startOfDay);
    const endUnix = dateToUnixSec(new Date(startOfDay.getTime() + 5 * 60 * 60 * 1000));
    return { startDate: startUnix, endDate: endUnix };
}

export const formatDateTime = (date: Date) => date.toISOString().slice(0, 16);
