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