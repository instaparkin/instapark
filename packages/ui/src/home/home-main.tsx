'use client';

import React from 'react';
import { useQuery } from '@apollo/client';
import { ListingCard } from '../components/listing-card';
import { HomeSearchBar } from './home-search-bar';
import { Listing } from '@instapark/types';
import { HomeListingsSkeleton } from './home-listings-skeleton';
import { SEARCH_LISTINGS } from '../graphql/search-listings';
import { RootState, useSelector } from '@instapark/state';
import { dateToUnixSec } from '../utils/dayjs';

export const HomeMain = () => {
	const { street, startDate, endDate, vehicleType } = useSelector(
		(state: RootState) => state.search,
	);

	const { loading, data } = useQuery(SEARCH_LISTINGS, {
		variables: {
			street,
			startDate: dateToUnixSec(new Date(startDate as string)),
			endDate: dateToUnixSec(new Date(endDate as string)),
			vehicleType,
		},
	});

	return (
		<div>
			<HomeSearchBar />
			{loading ? (
				<HomeListingsSkeleton />
			) : (
				<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
					{data?.ListingQuery?.searchListings?.map((item) => (
						<ListingCard key={item?.id} listing={item as Listing} />
					))}
				</div>
			)}
		</div>
	);
};
