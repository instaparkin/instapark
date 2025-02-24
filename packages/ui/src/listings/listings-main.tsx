"use client"

import React from 'react'
import { Listing } from '@instapark/types'
import { ListingsAddButton } from './listings-add-button'
import { useQuery } from '@apollo/client'
import { GET_LISTINGS } from '../graphql/get-listings'
import { useAuth } from '../hooks/use-auth'
import toast from 'react-hot-toast'
import { DataTable } from '../components/data-table'
import { listingMainColumns } from './listings-main-columns'

export const ListingsMain = () => {
  const { userId } = useAuth();

  console.log(userId);


  const { data, loading, error } = useQuery(GET_LISTINGS, {
    variables: {
      userId
    }
  });

  console.log(data);


  React.useEffect(() => {
    if (loading) {
      toast.loading("Fetching Listings")
    }
    if (error) {
      toast.error(`${error}`)
    }
  }, [loading, error])

  return (
    <div>
      <ListingsAddButton userId={userId} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <DataTable
          data={data?.ListingQuery?.getListings as Listing[]}
          columns={listingMainColumns} />
      </div>
    </div>
  )
}
