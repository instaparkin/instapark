'use client';

import { useQuery } from '@apollo/client';
import { GET_VENDOR } from '../graphql/get-vendor';
import { Vendor } from '@instapark/types';
import { useAuth } from './use-auth';
import { uuidToAlphanumeric } from '@instapark/common';

export const useVendor = () => {
	const { userId } = useAuth();

	const { data, loading, error } = useQuery(GET_VENDOR, {
		variables: {
			vendorId: uuidToAlphanumeric(userId),
		},
	});

	return {
		loading,
		error,
		isVendor: data?.VendorQuery?.getVendor?.vendor_id != null,
		vendorInfo: data?.VendorQuery?.getVendor as Vendor,
	};
};
