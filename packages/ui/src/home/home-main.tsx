"use client";

import React from "react";
import { useQuery } from "@apollo/client";
import { ListingCard } from "../components/listing-card";
import { HomeSearchBar } from "./home-search-bar";
import { Listing } from "@instapark/types";
import toast from "react-hot-toast";
import { HomeListingsSkeleton } from "./home-listings-skeleton";
import { SEARCH_LISTINGS } from "../graphql/search-listings";
import { HomeListingReview } from "./home-listing-review";


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
            {data?.ListingQuery?.searchListings?.map((item) => (
              <ListingCard key={item?.id} listing={item} />
            ))}
          </div>
        )}
      <HomeListingReview
        count={3}
        review={"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of aad a "}
        firstName={"Jhon"}
        lastName={"Doe"}
        timeJoined={1740312405}
        reviewDate={1740312405} />
    </div>
  );
};

