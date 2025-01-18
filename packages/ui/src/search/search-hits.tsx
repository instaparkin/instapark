import { Listing } from '@instapark/types'
import React from 'react'
import { ListingCard } from '../components/listing-card'

interface SearchHitsProps {
  listings: Listing[]
}

export const SearchHits: React.FC<SearchHitsProps> = ({ listings }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
      {listings?.map((item, index) => (
        <ListingCard key={index} listing={item} />
      ))}
    </div>
  )
}
