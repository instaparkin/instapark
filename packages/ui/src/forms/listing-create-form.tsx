'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import z from 'zod';
import { listingsCreateSchema } from '@instapark/schemas';
import { useQuery } from '@apollo/client';
import { HOST_LISTINGS } from '../graphql/host-listings';
import { useAuth } from '../hooks/use-auth';
import { useParams } from 'next/navigation';
import { useEffect } from 'react';
import { Listing } from '@instapark/types';

export type ListingsAddType = z.infer<typeof listingsCreateSchema>;

interface ListingCreateFormProps {
	defaultValues: boolean;
}

export const ListingCreateForm = ({
	defaultValues,
}: ListingCreateFormProps) => {
	const { userId } = useAuth();
	const { listing } = useParams();
	const { data } = useQuery(HOST_LISTINGS, {
		variables: {
			userId,
			id: listing as string,
		},
	});
	const listingFromDB = data?.ListingQuery?.hostListings?.at(0) as Listing;

	const form = useForm<ListingsAddType>({
		resolver: zodResolver(listingsCreateSchema),
		defaultValues: {
			basePrice: 10,
			plph: 60,
		},
	});

	useEffect(() => {
		form.setValue('userId', userId);
		if (defaultValues && listingFromDB) {
			const updatedValues = Object.fromEntries(
				Object.entries(listingFromDB).filter(
					(
						[_, value], // eslint-disable-line @typescript-eslint/no-unused-vars
					) => value !== null && value !== '',
				),
			);
			if (Object.keys(updatedValues).length > 0) {
				form.reset(updatedValues);
			}
		}
	}, [listingFromDB]);

	return {
		form,
	};
};
