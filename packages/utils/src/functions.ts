import { v4 as uuid } from "uuid";

export const getInterval = (startTime: Date, endTime: Date) => {
    return Math.abs(startTime.getTime() - endTime.getTime());
}

export const addUUID = <T>(object: T, inputUUID?: string, id?: string): T & Record<string, string> => {
    return {
        [id || "id"]: inputUUID || uuid(),
        ...object
    };
};

/**
 * https://www.algolia.com/doc/guides/sending-and-managing-data/prepare-your-data/in-depth/what-is-in-a-record/#dates
 * @param date 
 * @returns 
 */
export function toUnixTimestamp(date: string | Date): number {
    const parsedDate = typeof date === "string" ? new Date(date) : date;
    return Math.floor(parsedDate.getTime() / 1000);
}
