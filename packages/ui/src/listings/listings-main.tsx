'use client';

import React from 'react';
import { ListingsAddButton } from './listings-add-button';
import { useQuery } from '@apollo/client';
import { HOST_LISTINGS } from '../graphql/host-listings';
import { useAuth } from '../hooks/use-auth';
import { DataTableLoading } from '../components/data-table';
import { listingMainColumns } from './listings-main-columns';
import { Listing } from '../__generated__/graphql';
import { ListingsDataTable } from './listings-main-data-table';
import { NoResults } from '../components/no-results';
import toast from 'react-hot-toast';

export const ListingsMain = () => {
	const { userId } = useAuth();
	const { data, loading, error } = useQuery(HOST_LISTINGS, {
		variables: { userId, id: null },
	});

	const listings = data?.ListingQuery?.hostListings ?? [];

	if (error) {
		toast.error(`${error}`);
	}

	return (
		<div>
			<div className="mb-4 flex items-center justify-between">
				<h2 className="text-lg font-semibold md:text-2xl">Your Listings</h2>
				<ListingsAddButton />
			</div>
			{loading ? (
				<DataTableLoading />
			) : listings.length === 0 ? (
				<NoResults text="Add Your First Listing" />
			) : (
				<ListingsDataTable
					data={listings as Listing[]}
					columns={listingMainColumns}
				/>
			)}
		</div>
	);
};
