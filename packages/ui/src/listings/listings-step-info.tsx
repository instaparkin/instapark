import React from 'react';
import { Card, CardDescription, CardTitle } from '../components//card';
import { Separator } from '../components/separator';
import { Text } from '../components/text';

interface ListingsStepInfoProps {
	stepNumber: number;
	title: string;
	description: string;
}

export function ListingsStepInfo({
	stepNumber,
	title,
	description,
}: ListingsStepInfoProps) {
	return (
		<Card className="grid h-96 border-none shadow-none lg:grid-cols-2">
			<div className="flex flex-col justify-end space-y-4">
				<CardDescription>
					<Text
						text={`Step ${stepNumber}`}
						className="text-muted-foreground font-medium"
					/>
				</CardDescription>
				<CardTitle>
					<Text text={title} className="text-3xl" />
				</CardTitle>
				<Separator />
				<CardDescription>
					<Text text={description} className="text-wrap text-base" />
				</CardDescription>
			</div>
		</Card>
	);
}
