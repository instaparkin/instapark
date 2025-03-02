'use client';

import React from 'react';
import { EarningsStats } from './earnings-stats';
import { EarningsTransactions } from './earnings-transactions';
import { useAuth } from '../hooks/use-auth';
import { uuidToAlphanumeric } from '@instapark/common';

export const EarningsMain = () => {
	const { userId } = useAuth();

	return (
		<div className="space-y-6">
			<EarningsStats userId={userId} vendorId={uuidToAlphanumeric(userId)} />
			<h2 className="text-lg font-semibold">Transactions</h2>
			<EarningsTransactions />
		</div>
	);
};
