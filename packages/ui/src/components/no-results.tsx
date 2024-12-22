import { ReactNode } from "react"
import { Skeleton } from "./skeleton"
import { Icon } from "./icon"

interface INoResults {
    text: string
    icon: ReactNode
  }

export const NoResults = ({ text, icon }: INoResults) => {
    return (
      <Skeleton className="border animate-none text-wrap flex flex-col justify-center items-center w-full h-96 rounded-md space-y-2">
        <Icon>
          {icon}
        </Icon>
        <span className="font-light">
          {text}
        </span>
      </Skeleton>
    )
  }