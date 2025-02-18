"use client";

import React, { useEffect } from "react";
import { useQuery, gql } from "@apollo/client";
import { ListingCard } from "../components/listing-card";
import { SearchBarMain } from "../search/search-bar-main";
import { Listing } from "@instapark/types";
import toast from "react-hot-toast";
import { Skeleton } from "../components/skeleton";
import { Card, CardContent, CardFooter } from "../components/card";

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
      <SearchBarMain />
      {loading ? <ListingLoading />
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

const ListingCardSkeleton = () => {
  return (
    <Card className="overflow-hidden">
      <div className="relative aspect-[4/3]">
        <Skeleton className="h-full w-full" />
      </div>
      <CardContent className="p-4 flex-col space-y-2">
        <div className="flex justify-between items-center">
          <Skeleton className="h-4 w-2/3" />
          <Skeleton className="h-4 w-8" />
        </div>
        <div className="flex gap-2">
          <Skeleton className="h-8 w-16" />
          <Skeleton className="h-8 w-16" />
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Skeleton className="h-4 w-24" />
      </CardFooter>
    </Card>
  )
}

interface ListingLoadingProps {
  count?: number
}

export const ListingLoading: React.FC<ListingLoadingProps> = ({ count = 8 }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <ListingCardSkeleton key={index} />
      ))}
    </div>
  )
}