import dayjs from "dayjs"
import localizedFormat from 'dayjs/plugin/localizedFormat'

dayjs.extend(localizedFormat);

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