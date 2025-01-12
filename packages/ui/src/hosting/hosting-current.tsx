import React from "react"
import { CiCircleCheck } from "react-icons/ci"
import { NoResults } from "../components/no-results"

export const HostingCurrent = () => {
  return (
    <NoResults
      text="You don't have any guests staying with you right now."
      icon={<CiCircleCheck className="w-10 h-10" />}
    />
  )
}
