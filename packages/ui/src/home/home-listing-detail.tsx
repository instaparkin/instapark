"use client"

import React, { useEffect, useState } from 'react';
import { Page } from '../components/page';
import { ListingDetailed } from './home-listing-detailed';
import { Listing as ListingType } from '@instapark/types';

interface ListingDetailProps {
  listingId: string;
}

export function HomeListingDetail({ listingId }: ListingDetailProps) {
  const [listing, setListing] = useState<ListingType | null>(null);

  useEffect(() => {
    async function fetchListing() {
      const response = await fetch(`http://localhost:8080/listings/get/${listingId}`);
      const data = await response.json()
      setListing(data);
    }
    fetchListing();
  }, []);

  return (
    <Page>
      {listing ? (
        <ListingDetailed
          {...listing}
        />
      ) : (
        <p>Loading...</p>
      )}
    </Page>
  );
}
