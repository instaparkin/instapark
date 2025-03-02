import { v4 as uuid } from 'uuid';

export const getInterval = (startTime: number, endTime: number) => {
	return Math.abs(startTime - endTime);
};

export const addUUID = <T>(
	object: T,
	inputUUID?: string,
	id?: string,
): T & Record<string, string> => {
	return {
		[id || 'id']: inputUUID || uuid(),
		...object,
	};
};

export function toUnixTimestamp(date: string | Date): number {
	const parsedDate = typeof date === 'string' ? new Date(date) : date;
	return Math.floor(parsedDate.getTime() / 1000);
}
