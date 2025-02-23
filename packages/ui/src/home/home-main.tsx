"use client";

import React from "react";
import { useQuery } from "@apollo/client";
import { ListingCard } from "../components/listing-card";
import { HomeSearchBar } from "./home-search-bar";
import { Listing } from "@instapark/types";
import toast from "react-hot-toast";
import { HomeListingsSkeleton } from "./home-listings-skeleton";
import { SEARCH_LISTINGS } from "../graphql/search-listings";


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

