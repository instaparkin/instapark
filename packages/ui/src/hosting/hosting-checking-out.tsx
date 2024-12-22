import { NoResults } from "../components/no-results"
import { CiCircleCheck } from "react-icons/ci";

export const HostingCheckingOut = () => {
  return (
    <NoResults
      text="You don't have any guests checking out today or tomorrow."
      icon={<CiCircleCheck className="w-10 h-10" />}
    />
  )
}
