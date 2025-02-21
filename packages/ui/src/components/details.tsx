import React from "react"
import { cn } from "../utils/cn"
import { Separator } from "./separator"

interface DetailsProps {
    items: {
        field: string | React.ReactNode
        value: string | number | React.ReactNode,
        separator?: boolean
        className?: string
    }[]
    className?: string
}

export function Details({ items, className }: DetailsProps) {
    return (
        <div className={cn("grid gap-3", className)}>
            {items.map((item, index) => (
                <>
                    {item.separator && <Separator className="my-2" />}
                    <div key={index} className="grid grid-cols-1 sm:grid-cols-[180px_1fr] gap-2 sm:gap-4 items-start">
                        <div className="text-sm text-muted-foreground">{item.field}</div>
                        <div className={cn("text-sm font-medium")}>{item.value}</div>
                    </div>
                </>
            ))}
        </div>
    )
}

