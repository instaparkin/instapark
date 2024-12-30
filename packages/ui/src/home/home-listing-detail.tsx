"use client"

import { useEffect, useState } from 'react';
import { Page } from '../components/page';
import { Listing } from '../components/listing';
import { Listing as ListingType } from '@instapark/types';
import { getListingFromDb } from '@instapark/listings';

interface ListingDetailProps {
  listingId: string;
}

export function HomeListingDetail({ listingId }: ListingDetailProps) {
  const [listing, setListing] = useState<ListingType | null>(null);

  useEffect(() => {
    async function fetchListing() {
      const response = await fetch(`http://localhost:8087/listings/get/${listingId}`);
      const data = await response.json()
      setListing(data);
    }
    fetchListing();
  }, []);

  return (
    <Page>
      {listing ? (
        <Listing
          view="detailed"
          {...listing}
        />
      ) : (
        <p>Loading...</p>
      )}
    </Page>
  );
}
