"use client"

import React from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import axios from 'axios';

export const useSearch = () => {
  /**
   * TODO:
   * Search
   * Check in and check out Filtering
   * Allowed Vehicles
   * Type of listing
   * pricing
   */
  const pathname = usePathname();
  const searchParams = useSearchParams()
  const { replace } = useRouter();

  const getSearchParams = (searchParam: string) => {
    return searchParams.get(searchParam)?.toString()
  }

  const handleSearch = (query: string) => {
    const currentSearchParams = searchParams.toString(); // Converts query params to a query string
    console.log(currentSearchParams);
    
    const url = `http://localhost:8080/search/listing_1?${encodeURIComponent("q=mgroad&query_by=city,state&filter_by=start")}`;

    axios.get(url)
      .then(res => {
        console.log(res.data);
      }).catch((error) => {
        console.error(error);
      })
  }

  return {
    getSearchParams,
    handleSearch
  }
}
