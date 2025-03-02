import React from 'react';
import { Avatar, AvatarFallback } from './avatar';
import { formatName } from '../utils/field-name';
import { timeInInstapark } from '../utils/dayjs';
import { cn } from '../utils/cn';

interface UserMiniProps {
	firstName: string;
	lastName: string;
	timeJoined: number;
	host?: boolean;
	className?: string;
}

export function UserMini({
	firstName,
	lastName,
	timeJoined,
	host,
	className,
}: UserMiniProps) {
	return (
		<div className={cn('border-b border-t py-4', className)}>
			<div className="flex items-center gap-4">
				<Avatar>
					<AvatarFallback className="bg-accent">
						{firstName?.at(0)}
					</AvatarFallback>
				</Avatar>
				<div className="flex flex-col">
					<h2 className="text-base font-medium">
						{host && 'Hosted by '} {formatName(firstName, lastName ?? '')}
					</h2>
					<p className="text-muted-foreground text-sm">
						{timeInInstapark(timeJoined)}
					</p>
				</div>
			</div>
		</div>
	);
}
