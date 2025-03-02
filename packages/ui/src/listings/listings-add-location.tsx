'use client';

import React from 'react';
import { Path, UseFormReturn } from 'react-hook-form';
import { MapsSearch } from '../maps/maps-search';
import { ListingsFormField } from './listings-form-field';
import dynamic from 'next/dynamic';
import { Skeleton } from '../components/skeleton';
import { MapData } from '@instapark/state/src/slices/maps-slice';
import { ListingRequest } from '@instapark/types';

const MapDynamic = dynamic(
	() => import('../maps/maps-main').then((mod) => mod.MapsMain),
	{
		loading: () => <Skeleton className="h-[90vh] w-full" />,
	},
);

interface FieldsToUpdateProps {
	path: Path<ListingRequest>;
	value: string | number;
}

export const ListingsAddLocation = ({
	form,
}: {
	form: UseFormReturn<ListingRequest>;
}) => {
	const handleLocationUpdate = (location: MapData) => {
		const fieldsToUpdate: FieldsToUpdateProps[] = [
			{ path: 'latitude', value: location?.lat as number },
			{ path: 'longitude', value: location?.lng as number },
			{ path: 'country', value: location?.country as string },
			{ path: 'state', value: location?.state as string },
			{ path: 'district', value: location?.district as string },
			{ path: 'city', value: location?.taluk as string },
			{ path: 'street', value: location?.street as string },
			{ path: 'pincode', value: location?.pincode as string },
		];

		for (const field of fieldsToUpdate) {
			form.setValue(field.path, field.value, {
				shouldDirty: true,
				shouldValidate: true,
				shouldTouch: true,
			});
		}
	};

	return (
		<div className="mx-auto max-w-[630px] space-y-4">
			<MapsSearch onLocationClick={handleLocationUpdate} />
			<MapDynamic />
			<ListingsFormField
				form={form}
				name="country"
				value={form.getValues('country')}
			/>
			<ListingsFormField
				form={form}
				name="state"
				value={form.getValues('state')}
			/>
			<ListingsFormField
				form={form}
				name="district"
				value={form.getValues('district')}
			/>
			<ListingsFormField
				form={form}
				name="city"
				value={form.getValues('city')}
			/>
			<ListingsFormField
				form={form}
				name="street"
				value={form.getValues('street')}
			/>
			<ListingsFormField
				form={form}
				name="pincode"
				value={form.getValues('pincode') as number}
			/>
			<ListingsFormField
				form={form}
				name="name"
				value={form.getValues('name') as string}
			/>
			<ListingsFormField
				form={form}
				name="landmark"
				value={form.getValues('landmark') as string}
			/>
			<ListingsFormField
				form={form}
				name="latitude"
				value={form.getValues('latitude')?.toString()}
			/>
			<ListingsFormField
				form={form}
				name="longitude"
				value={form.getValues('longitude')?.toString()}
			/>
		</div>
	);
};
