'use client';

import { useQuery } from '@apollo/client';
import React from 'react';
import { DataTable, DataTableLoading } from '../components/data-table';
import toast from 'react-hot-toast';
import { transactionsColumns } from './earnings-transactions-columns';
import { GET_RECON_DATA } from '../graphql/get-recon-data';
import { EntityType, ReconData } from '../__generated__/graphql';
import { useAuth } from '../hooks/use-auth';

export const EarningsTransactions = () => {
	const { userId } = useAuth();
	const { data, loading, error } = useQuery(GET_RECON_DATA, {
		variables: {
			userId,
			limit: 10,
			entityType: EntityType.Transaction,
		},
	});

	if (loading) {
		return <DataTableLoading />;
	}

	if (error) {
		return toast.error(`${error}`);
	}

	const transactions =
		data?.BookingQuery?.buyerBookings?.flatMap((b) =>
			b?.booking?.payments?.flatMap((p) => p?.reconData || []),
		) || [];

	return (
		<DataTable
			data={transactions as ReconData[]}
			columns={transactionsColumns}
		/>
	);
};
