import React, { ReactNode } from 'react';
import { cn } from '../utils/cn';

interface IconProps {
	children: ReactNode;
	className?: string;
}

export const Icon: React.FC<IconProps> = ({ children, className }) => {
	return (
		<div
			className={cn(
				'w-fit rounded-full border p-2 transition-transform duration-200 ease-in-out hover:scale-105',
				className,
			)}
		>
			{children}
		</div>
	);
};
