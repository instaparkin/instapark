'use client';

import React from 'react';
import { LuHotel } from 'react-icons/lu';
import { PiCastleTurret } from 'react-icons/pi';
import { MdOutlineCabin } from 'react-icons/md';
import { PiBarn } from 'react-icons/pi';
import { BsHouseDoor } from 'react-icons/bs';
import { UseFormReturn } from 'react-hook-form';
import { PiFarm } from 'react-icons/pi';
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '../components/form';
import { RadioGroup, RadioGroupItem } from '../components/radio-group';
import { ListingRequest, PlaceType } from '@instapark/types';

export type PlaceTypeWithIcon = {
	type: PlaceType;
	icon: React.ReactNode;
};

const placetypes: PlaceTypeWithIcon[] = [
	{
		type: PlaceType.House,
		icon: <BsHouseDoor className="h-10 w-10" />,
	},
	{
		type: PlaceType.Hotel,
		icon: <LuHotel className="h-10 w-10" />,
	},
	{
		type: PlaceType.Castle,
		icon: <PiCastleTurret className="h-10 w-10" />,
	},
	{
		type: PlaceType.Cabin,
		icon: <MdOutlineCabin className="h-10 w-10" />,
	},
	{
		type: PlaceType.Barn,
		icon: <PiBarn className="h-10 w-10" />,
	},
	{
		type: PlaceType.Farm,
		icon: <PiFarm className="h-10 w-10" />,
	},
];

export const ListingsAddPlaceType = ({
	form,
}: {
	form: UseFormReturn<ListingRequest>;
}) => {
	return (
		<FormField
			control={form.control}
			name="type"
			render={({ field }) => (
				<FormItem>
					<FormControl className="w-full">
						<RadioGroup
							onValueChange={field.onChange}
							defaultValue={field.value}
							className="mx-auto grid w-fit max-w-[630px] grid-cols-2"
						>
							{placetypes.map((p) => (
								<FormItem key={p.type} className="mx-auto flex items-center">
									<FormControl>
										<RadioGroupItem value={p.type} className="sr-only" />
									</FormControl>
									<FormLabel
										className={`text-foreground flex cursor-pointer items-center justify-between rounded-xl border-2 p-10 transition-colors ${
											field.value === p.type
												? 'border-primary bg-muted'
												: 'border-muted hover:border-primary/50'
										}`}
									>
										<div className="flex flex-col items-center gap-2">
											<span>{p.type}</span>
											<span>{p.icon}</span>
										</div>
									</FormLabel>
								</FormItem>
							))}
						</RadioGroup>
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
};
