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

export const unixSecToISO = (dateInUnixSeconds: number): Date => {
    return new Date(dayjs.unix(dateInUnixSeconds).toISOString())
}

export const dateToUnixSec = (date: Date) => {
    return dayjs(date).unix()
}

export const timeInInstapark = (dateInUnixSeconds: number) => {
    const date = unixSecToISO(dateInUnixSeconds)
    return "Joined " + dayjs(date).fromNow()
}