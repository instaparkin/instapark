'use client';

import React from 'react';
import { useMutation } from '@apollo/client';
import { Group, SidebarForm } from '../components/sidebar-form';
import {
	ListingCreateForm,
	ListingsAddType,
} from '../forms/listing-create-form';
import { ListingsAddPlaceType } from './listings-add-place-type';
import { ListingsAddLocation } from './listings-add-location';
import { ListingsAddPhotos } from './listings-add-photos';
import { UPDATE_LISTING } from '../graphql/update-listings';
import toast from 'react-hot-toast';
import { ListingsAddAllowedVehicles } from './listings-add-allowed-vehicles';

interface ListingHostDetailedProps {
	listingId: string;
}

export const ListingHostDetailed = ({
	listingId,
}: ListingHostDetailedProps) => {
	const { form } = ListingCreateForm({ defaultValues: true });
	const listingsEditFormSteps: Group<ListingsAddType>[] = [
		{
			title: 'Place Type',
			component: ({ form }) => <ListingsAddPlaceType form={form} />,
			fields: [
				{
					name: 'type',
					label: 'Property Type',
					description:
						'Select the type of parking space (e.g., open lot, covered parking, garage, etc.).',
				},
			],
		},
		{
			title: 'Vehicles',
			component: ({ form }) => <ListingsAddAllowedVehicles form={form} />,
			fields: [],
		},
		{
			title: 'Location',
			component: ({ form }) => <ListingsAddLocation form={form} />,
			fields: [
				{
					name: 'country',
					label: 'Country',
					description: 'Select the country where the parking space is located.',
				},
				{
					name: 'state',
					label: 'State/Region',
					description: 'Specify the state or region of the parking space.',
				},
				{
					name: 'district',
					label: 'District',
					description:
						'Provide the district name for more precise location details.',
				},
				{
					name: 'city',
					label: 'City',
					description: 'Enter the city where the parking space is situated.',
				},
				{
					name: 'street',
					label: 'Street Address',
					description:
						'Provide the street name and exact location of the parking space.',
				},
				{
					name: 'pincode',
					label: 'Postal Code',
					description: 'Enter the postal or ZIP code of the location.',
				},
				{
					name: 'name',
					label: 'Parking Lot Name',
					description:
						'Specify the name of the parking facility, if applicable.',
				},
				{
					name: 'landmark',
					label: 'Nearby Landmark',
					description:
						'Mention a well-known nearby landmark to help identify the parking location.',
				},
			],
		},
		{
			title: 'Photos',
			component: ({ form }) => <ListingsAddPhotos form={form} />,
			fields: [
				{
					name: 'photos',
					label: 'Upload Photos',
					description:
						'Upload clear images of the parking space to give users a better view.',
				},
			],
		},
		{
			title: 'Pricing',
			fields: [
				{
					name: 'basePrice',
					label: 'Base Price',
					description: 'Set the base hourly rate for parking at this location.',
				},
				{
					name: 'pphbi',
					label: 'Bike Parking (Per Hour)',
					description:
						'Specify the hourly parking fee for two-wheelers like motorcycles and scooters.',
				},
				{
					name: 'pphcr',
					label: 'Car Parking (Per Hour)',
					description:
						'Specify the hourly parking fee for cars and other four-wheelers.',
				},
				{
					name: 'pphcy',
					label: 'Cycle Parking (Per Hour)',
					description: 'Specify the hourly parking fee for bicycles.',
				},
				{
					name: 'plph',
					label: 'Late Fee (Per Hour)',
					description:
						'Specify the penalty charge per hour for overstaying beyond the booked duration.',
				},
			],
		},
	];

	const [updateListing] = useMutation(UPDATE_LISTING, {
		onCompleted: (data) => {
			toast.success(data?.ListingMutation?.updateListing as string);
		},
		onError: (error) => {
			toast.error(`${error}`);
		},
	});

	return (
		<SidebarForm
			form={form}
			groups={listingsEditFormSteps}
			onSubmit={(data) => {
				updateListing({ variables: { ...data, id: listingId } });
			}}
		/>
	);
};
