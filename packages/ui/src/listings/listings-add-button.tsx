'use client';

import React from 'react';
import { Button } from '../components/button';
import toast from 'react-hot-toast';
import Link from 'next/link';
import { useVendor } from '../hooks/use-vendor';
import { Skeleton } from '../components/skeleton';

export const ListingsAddButton = () => {
	const { isVendor, loading } = useVendor();

	if (loading) {
		return <Skeleton className="h-9 w-32 rounded-md px-3 lg:h-11 lg:px-8" />;
	}

	if (isVendor) {
		return (
			<Button variant={'outline'} size={'responsive'} asChild>
				<Link href={`/hosting/listings/add`}>Create Listing</Link>
			</Button>
		);
	}

	return (
		<Button
			variant={'outline'}
			onClick={() => toast.error('Add the Payment Details first')}
		>
			{loading && <Skeleton className="h-9 rounded-md px-3 lg:h-11 lg:px-8" />}
			Create Listing
		</Button>
	);
};
