import React from 'react'
import { NoResults } from '../components/no-results'
import { CiCircleCheck } from 'react-icons/ci'

export const HostingPendingReview = () => {
  return (
    <NoResults
      text="You don't have any guest reviews to write."
      icon={<CiCircleCheck className="w-10 h-10" />}
    />
  )
}
