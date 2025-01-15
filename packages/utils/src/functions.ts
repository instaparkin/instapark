export const getInterval = (startTime: Date, endTime: Date) => {
    return Math.abs(startTime.getTime() - endTime.getTime());
}