import React from 'react'
import { NoResults } from '../components/no-results'
import { CiCircleCheck } from 'react-icons/ci'

export const HostingUpcoming = () => {
  return (
    <NoResults
      text="You currently don't have any upcoming guests."
      icon={<CiCircleCheck className="w-10 h-10" />}
    />
  )
}
