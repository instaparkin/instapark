import React from 'react';
import Image from 'next/image';
import { formatLocation } from '../utils/field-name';
import { Listing } from '../__generated__/graphql';

export const ListingMini = ({ listing }: { listing: Listing }) => {
	return (
		<div className="flex items-center gap-4">
			<div className="relative h-20 w-20 flex-shrink-0 sm:h-24 sm:w-24">
				<Image
					fill
					src={(listing.photos[0] as string) || '/placeholder.svg'}
					alt={`Listing Photo`}
					className="rounded-lg border object-cover"
				/>
			</div>
			<div className="min-w-0 flex-1">
				<div className="mt-1 line-clamp-2">
					{formatLocation(
						listing.country,
						listing.state,
						listing.district,
						listing.city,
						listing.street,
						listing.pincode,
					)}
				</div>
			</div>
		</div>
	);
};
