import React from 'react';
import { ListingsAddPlaceType } from './listings-add-place-type';
import { ListingsAddLocation } from './listings-add-location';
import { ListingsAddPhotos } from './listings-add-photos';
import { ListingsAddAllowedVehicles } from './listings-add-allowed-vehicles';
import { Step } from '../types/multi-step-form-types';
import { ListingsStepInfo } from './listings-step-info';
import { ListingRequest } from '@instapark/types';

export const listingsAddSteps: Step<ListingRequest>[] = [
	{
		substeps: [
			{
				name: 'Tell us about your property',
				fields: [],
				component: () => (
					<ListingsStepInfo
						stepNumber={1}
						title={'Tell us about your property'}
						description={
							"In this step, we'll ask you which type of property you have and if guests will book the entire place or just a room. Then let us know the location and how many guests can stay."
						}
					/>
				),
			},
			{
				name: "What's your place type?",
				fields: [{ name: 'type' }],
				component: ({ form }) => <ListingsAddPlaceType form={form} />,
			},
			{
				name: 'Add your location',
				fields: [
					{ name: 'city', disabled: true },
					{ name: 'country', disabled: true },
					{ name: 'state', disabled: true },
					{ name: 'district', disabled: true },
					{ name: 'street' },
					{ name: 'pincode' },
					{ name: 'name' },
					{ name: 'landmark' },
					{ name: 'latitude', disabled: true },
					{ name: 'longitude', disabled: true },
				],
				component: ({ form }) => <ListingsAddLocation form={form} />,
			},
		],
	},
	{
		substeps: [
			{
				name: 'Photos and Allowed Vehicles',
				fields: [],
				component: () => (
					<ListingsStepInfo
						stepNumber={2}
						title={'Add photos'}
						description={
							"In this step, we'll ask you which type of property you have and if guests will book the entire place or just a room. Then let us know the location and how many guests can stay."
						}
					/>
				),
			},
			{
				name: 'Photos',
				component: ({ form }) => <ListingsAddPhotos form={form} />,
				fields: [{ name: 'photos' }],
			},
			{
				name: 'Allowed Vehicles',
				component: ({ form }) => <ListingsAddAllowedVehicles form={form} />,
				fields: [{ name: 'allowedVehicles' }],
			},
		],
	},
	{
		substeps: [
			{
				name: 'Pricing',
				fields: [],
				component: () => (
					<ListingsStepInfo
						stepNumber={3}
						title={'Tell us about your property'}
						description={
							"In this step, we'll ask you which type of property you have and if guests will book the entire place or just a room. Then let us know the location and how many guests can stay."
						}
					/>
				),
			},
			{
				name: 'Pricing',
				fields: [
					{ name: 'basePrice' },
					{ name: 'pphbi' },
					{ name: 'plph' },
					{ name: 'pphcr' },
					{ name: 'pphcy' },
				],
			},
		],
	},
];
