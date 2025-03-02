import { HomeListingsDetailed, Page } from '@instapark/ui';
import React from 'react';

interface ParkingInterface {
	params: Promise<{ id: string }>;
}

const ParkingsPage = async ({ params }: ParkingInterface) => {
	const listingId = (await params).id;

	return (
		<Page>
			<HomeListingsDetailed listingId={listingId} />
		</Page>
	);
};

export default ParkingsPage;
