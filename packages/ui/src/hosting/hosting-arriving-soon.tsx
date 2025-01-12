import React from "react"
import { CiCircleCheck } from "react-icons/ci"
import { NoResults } from "../components/no-results"

export const HostingArrivingSoon = () => {
  return (
    <NoResults
      text="You don't have any guests arriving today or tomorrow."
      icon={<CiCircleCheck className="w-10 h-10" />}
    />
  )
}
