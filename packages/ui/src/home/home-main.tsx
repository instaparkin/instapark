"use client";

import React from "react";
import { useQuery } from "@apollo/client";
import { ListingCard } from "../components/listing-card";
import { HomeSearchBar } from "./home-search-bar";
import { Listing } from "@instapark/types";
import { HomeListingsSkeleton } from "./home-listings-skeleton";
import { SEARCH_LISTINGS } from "../graphql/search-listings";
import { RootState, useSelector } from "@instapark/state";
import { listingsCreateSchema } from "@instapark/schemas";
import { ListingCreateForm, ListingsAddType } from "../forms/listing-create-form";
import { ListingsAddPlaceType } from "../listings/listings-add-place-type";

export const HomeMain = () => {
  const { street, startDate, endDate, vehicleType } = useSelector((state: RootState) => state.search)

  const { loading, data } = useQuery(SEARCH_LISTINGS, {
    variables: {
      street,
      startDate,
      endDate,
      vehicleType
    }
  });

  return (
    <div>
      <HomeSearchBar />
      {loading ? <HomeListingsSkeleton />
        : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {data?.ListingQuery?.searchListings?.map((item) => (
              <ListingCard key={item?.id} listing={item as Listing} />
            ))}
          </div>
        )}
    </div>
  );
};

