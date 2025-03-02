'use client';

import { useQuery } from '@apollo/client';
import React from 'react';
import { DataTable, DataTableLoading } from '../components/data-table';
import toast from 'react-hot-toast';
import { settlementColumns } from './earnings-settlement-columns';
import { GET_RECON_DATA } from '../graphql/get-recon-data';
import { EntityType } from '../__generated__/graphql';
import { VendorCommission } from '@instapark/types';
import { useAuth } from '../hooks/use-auth';

export const EarningsSettlements = () => {
	const { userId } = useAuth();
	const { data, loading, error } = useQuery(GET_RECON_DATA, {
		variables: {
			userId,
			limit: 100,
			entityType: EntityType.VendorCommision,
		},
	});

	if (loading) {
		return <DataTableLoading />;
	}

	if (error) {
		return toast.error(`${error}`);
	}
	const settlements =
		data?.BookingQuery?.buyerBookings?.flatMap((b) =>
			b?.booking?.payments?.flatMap((p) => p?.reconData || []),
		) || [];

	return (
		<DataTable
			data={settlements as VendorCommission[]}
			columns={settlementColumns}
		/>
	);
};
