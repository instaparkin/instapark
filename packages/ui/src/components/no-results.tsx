import React from 'react';
import { Skeleton } from './skeleton';
import { Icon } from './icon';

interface INoResults {
	text: string;
	icon?: React.ReactNode;
}

export const NoResults = ({ text, icon }: INoResults) => {
	return (
		<Skeleton className="flex h-96 w-full animate-none flex-col items-center justify-center space-y-2 text-wrap rounded-md border">
			<Icon>{icon}</Icon>
			<span className="font-light">{text}</span>
		</Skeleton>
	);
};
