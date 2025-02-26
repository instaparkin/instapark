import React from "react"
import { cn } from "../utils/cn"
import { Separator } from "./separator"

interface DetailsProps {
    items: {
        field: string | React.ReactNode
        value: string | number | React.ReactNode,
        separator?: boolean
        className?: string,
        visible?: boolean
    }[]
    className?: string
}

export function Details({ items, className, }: DetailsProps) {
    return (
        <div className={cn("grid gap-3", className)}>
            {items.map(({ separator, visible = true, field, value }, index) => (
                <div key={index}>
                    {separator && <Separator className="my-2" />}
                    {visible && <div key={index} className="grid grid-cols-1 sm:grid-cols-[180px_1fr] gap-2 sm:gap-4 items-start">
                        <div className="text-sm text-muted-foreground">{field}</div>
                        <div className={cn("text-sm font-medium")}>{value}</div>
                    </div>
                    }
                </div>
            ))}
        </div>
    )
}

