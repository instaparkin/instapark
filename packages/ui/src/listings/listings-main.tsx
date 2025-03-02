"use client"

import React from 'react'
import { ListingsAddButton } from './listings-add-button'
import { useQuery } from '@apollo/client'
import { HOST_LISTINGS } from '../graphql/host-listings'
import { useAuth } from '../hooks/use-auth'
import { DataTableLoading } from '../components/data-table'
import { listingMainColumns } from './listings-main-columns'
import { Listing } from '../__generated__/graphql'
import { ListingsDataTable } from './listings-main-data-table'
import { NoResults } from '../components/no-results'

export const ListingsMain = () => {
  const { userId } = useAuth();
  const { data, loading } = useQuery(HOST_LISTINGS, {
    variables: {
      userId,
      id: null
    }
  });
  if (data?.ListingQuery?.hostListings?.length === 0 || undefined) {
    return <NoResults text={'Add Your First Listing'} />
  }
  return (
    <div>
      <div className='flex items-center justify-between mb-4'>
        <h2 className='text-lg md:text-2xl font-semibold'>Your Listings</h2>
        <ListingsAddButton />
      </div>
      {
        loading ?
          <DataTableLoading /> :
          (
            data &&
            <ListingsDataTable
              data={data?.ListingQuery?.hostListings as Listing[]}
              columns={listingMainColumns} />
          )
      }
    </div>
  )
}
