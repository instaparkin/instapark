"use client"

import React from 'react'
import { useEffect, useState } from 'react'
import { ApiResponse, Listing } from '@instapark/types'
import axios from 'axios'
import { ListingCard } from '../components/listing-card'

export const ListingsMain = () => {

  const [data, setData] = useState<Listing[]>([]);

  useEffect(() => {
    axios.get<ApiResponse<Listing>>("http://localhost:8087/listings/listings/all?userId=d045f6ac-35c7-4cfa-afe9-91d5c3f9d7ce").then(res => setData(res.data.data as unknown as Listing[])
    )
  }, [])

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {data?.map((item, index) => (
        <ListingCard key={index} listing={item} />
      ))}
    </div>
  )
}
