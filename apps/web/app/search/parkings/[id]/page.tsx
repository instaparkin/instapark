import { HomeListingsDetailed } from '@instapark/ui'
import React from 'react'

interface ParkingInterface {
  params: Promise<{ id: string }>
}

const ParkingsPage = async ({ params }: ParkingInterface) => {
  const listingId = (await params).id;
  
  return (
    <HomeListingsDetailed listingId={listingId} />
  )
}

export default ParkingsPage