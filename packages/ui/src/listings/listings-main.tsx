"use client"

import React from 'react'
import { Listing } from '@instapark/types'
import { ListingCard } from '../components/listing-card'
import { gql, useQuery } from '@apollo/client'
import toast from 'react-hot-toast'

const GET_LISTINGS_FOR_HOST = gql`
query GetListingsForHost($userId: String!) {
  ListingQuery {
    getListingsForHost(userId: $userId) {
      userId
      type
      country
      state
      district
      city
      street
      pincode
      latitude
      longitude
      name
      landmark
      allowedVehicles
      basePrice
      pphbi
      pphcy
      pphcr
      plph
      photos
      id
      isOpen
      rating
      createdAt
      updatedAt
    }
  }
}
`;

export const ListingsMain = () => {

  const { loading, error, data } = useQuery(GET_LISTINGS_FOR_HOST, {
    variables: {
      userId: "d045f6ac-35c7-4cfa-afe9-91d5c3f9d7ce"
    }
  });

  if (error) {
    toast.error(`Error: ${error.message}`);
  }

  if (loading) {
    return <div>Loading...</div>
  }

  const listings: Listing[] = data.ListingQuery.getListingsForHost;
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {listings?.map((item, index) => (
        <ListingCard key={index} listing={item} />
      ))}
    </div>
  )
}
