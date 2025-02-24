import React from "react"
import { Avatar, AvatarFallback } from "./avatar"
import { formatName } from "../utils/field-name"
import { timeInInstapark } from "../utils/dayjs"

interface UserMiniProps {
    firstName: string
    lastName: string
    timeJoined: number
}

export function UserMini({ firstName, lastName, timeJoined }: UserMiniProps) {
    return (
        <div className="border-b border-gray-200 py-4">
            <div className="flex items-center gap-4">
                <Avatar>
                    <AvatarFallback>{firstName?.at(0)}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                    <h2 className="text-base font-medium">
                        Hosted by {formatName(firstName, lastName)}
                    </h2>
                    <p className="text-sm text-muted-foreground">
                        {timeInInstapark(timeJoined)}
                    </p>
                </div>
            </div>
        </div>
    )
}