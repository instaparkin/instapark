"use client";

import { useEffect, useState } from 'react';
import { AppDispatch, RootState, searchListings, useDispatch, useSelector } from '@instapark/state';
import { Icon } from '../components/icon';
import { AiOutlinePlus } from "react-icons/ai";
import { SearchInput } from '../components/search-input';
import Link from 'next/link';
import { ListingsViewToggle } from './listings-view-toggle';
import { Button } from '../components/button';

export const ListingsTools = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [view, setView] = useState<"Grid" | "List">("Grid")


  useEffect(() => {
    dispatch(searchListings({
      query_by: ["*"],
      collections: [{
        q: "*",
        name: "listing_1"
      }]
    }))
  }, [])

  return (
    <div className="flex items-center gap-4">
      <SearchInput
        placeholder="Search Your Listings"
      />
      <Button
        asChild
        variant={"outline"}
        size="icon"
      >
        <Link href={'/hosting/listings/add'}>
          <AiOutlinePlus className="h-4 w-4" />
        </Link>
      </Button>
      <ListingsViewToggle view={view} onViewChange={setView} />
    </div>
  );
};
