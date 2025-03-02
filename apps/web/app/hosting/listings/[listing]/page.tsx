import { ListingHostDetailed, Page } from '@instapark/ui';
import React from 'react';

type Props = {
	params: Promise<{ listing: string }>;
};

const ListingPage = async ({ params }: Props) => {
	const listingId = (await params).listing;
	return (
		<Page>
			<ListingHostDetailed listingId={listingId} />
		</Page>
	);
};

export default ListingPage;
