"use client";

import { useEffect } from 'react';
import { AppDispatch, RootState, searchListings, useDispatch, useSelector } from '@instapark/state';
import { Icon } from '../components/icon';
import { AiOutlinePlus } from "react-icons/ai";
import { SearchInput } from '../components/search-input';
import Link from 'next/link';

export const ListingsTools = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(searchListings({
      query_by: ["*"],
      collections: [{
        q: "*",
        name : "listing_1"
      }]
    }))
  }, [])

  return (
    <div className="flex items-center gap-4">
      <SearchInput
        placeholder="Search Your Listings"
      />
      <Link href={'/hosting/listings/add'}>
        <Icon>
          <AiOutlinePlus className="h-5 w-5" />
        </Icon>
      </Link>
    </div>
  );
};
