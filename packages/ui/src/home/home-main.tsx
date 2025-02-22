"use client";

import React, { useEffect } from "react";
import { useQuery, gql } from "@apollo/client";
import { ListingCard } from "../components/listing-card";
import { HomeSearchBar } from "./home-search-bar";
import { Listing } from "@instapark/types";
import toast from "react-hot-toast";
import { Skeleton } from "../components/skeleton";
import { Card, CardContent, CardFooter } from "../components/card";
import { HomeListingsSkeleton } from "../skeletons/home-listings-skeleton";

const SEARCH_LISTINGS = gql`
query GET_LISTINGS {
  ListingQuery {
    searchListings(vehicleType: Bike) {
      basePrice
      id
      isOpen
      state
      street
      allowedVehicles
      city
      country
      createdAt
      district
      landmark
      userId
      type
      updatedAt
      rating
      pphcy
      latitude
      longitude
      name
      photos
      pincode
      plph
      pphbi
      pphcr
    }
  }
}
`;

export const HomeMain = () => {
  const { loading, error, data } = useQuery(SEARCH_LISTINGS);

  if (error) {
    toast.error(`Error: ${error.message}`);
  }

  return (
    <div>
      <HomeSearchBar />
      {loading ? <HomeListingsSkeleton />
        : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {data?.ListingQuery?.searchListings?.map((item: Listing) => (
              <ListingCard key={item.id} listing={item} />
            ))}
          </div>
        )}
    </div>
  );
};

