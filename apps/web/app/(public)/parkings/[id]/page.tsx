import React from 'react'

interface ParkingInterface {
  params: {
    id: string
  }
}

const ParkingsPage = async ({ params }: ParkingInterface) => {
  return (
    <div>{params.id}</div>
  )
}

export default ParkingsPage