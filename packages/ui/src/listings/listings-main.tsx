"use client"

import React from 'react'
import { Listing } from '@instapark/types'
import { ListingCard } from '../components/listing-card'
import { gql, useQuery } from '@apollo/client'
import toast from 'react-hot-toast'
import { ListingsAddButton } from './listings-add-button'

export const ListingsMain = () => {

  const listings: Listing[] = [];
  return (
    <div>
      <ListingsAddButton />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {listings?.map((item, index) => (
          <ListingCard key={index} listing={item} />
        ))}
      </div>
    </div>
  )
}
