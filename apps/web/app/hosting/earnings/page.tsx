import { EarningsMain, Page } from '@instapark/ui';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
	title: 'Earnings - Instapark',
};

const EarningsPage = () => {
	return (
		<Page title="Earnings">
			<EarningsMain />
		</Page>
	);
};

export default EarningsPage;
