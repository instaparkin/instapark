"use client"

import React from 'react'
import { ListingsAddButton } from './listings-add-button'
import { useQuery } from '@apollo/client'
import { HOST_LISTINGS } from '../graphql/host-listings'
import { useAuth } from '../hooks/use-auth'
import toast from 'react-hot-toast'
import { DataTable, DataTableLoading } from '../components/data-table'
import { listingMainColumns } from './listings-main-columns'
import { Listing } from '../__generated__/graphql'

export const ListingsMain = () => {
  const { userId } = useAuth();

  const { data, loading, error } = useQuery(HOST_LISTINGS, {
    variables: {
      userId
    }
  });

  React.useEffect(() => {
    if (error) {
      toast.error(`${error}`)
    }
  }, [loading, error])

  return (
    <div>
      <div className='flex items-center justify-between mb-4'>
        <h2 className='text-lg md:text-2xl font-semibold'>Your Listings</h2>
        <ListingsAddButton userId={userId} />
      </div>
      {
        loading ?
          <DataTableLoading /> :
          <DataTable
            data={data?.ListingQuery?.hostListings as Listing[]}
            columns={listingMainColumns} />
      }
    </div>
  )
}
