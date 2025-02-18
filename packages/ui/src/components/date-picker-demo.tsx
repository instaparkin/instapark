"use client"

import * as React from "react"
import { addDays, format } from "date-fns"
import { DateRange } from "react-day-picker"

import { cn } from "../utils/cn"
import { Button } from "../components/button"
import { Calendar } from "../components/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "../components/popover"

export function DatePickerWithRange({
    className,
}: React.HTMLAttributes<HTMLDivElement>) {
    const [date, setDate] = React.useState<DateRange | undefined>({
        from: new Date(2024, 0, 20),
        to: addDays(new Date(2024, 0, 20), 20),
    })

    return (
        <div className={cn("grid gap-2", className)}>
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        id="date"
                        variant={"outline"}
                        className={cn(
                            " justify-start text-left font-normal",
                            !date && "text-muted-foreground"
                        )}
                    >
                        {date?.from ? (
                            date.to ? (
                                <div className="flex w-full justify-center">
                                    <div className="border">
                                        <div className="flex flex-col">
                                            <span>Check In</span>
                                            {format(date.from, "LLL dd, y")}
                                        </div>
                                    </div>
                                    <div className="border">
                                        <div className="flex flex-col">
                                            <span>Check Out </span>
                                            {format(date.to, "LLL dd, y")}
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                format(date.from, "LLL dd, y")
                            )
                        ) : (
                            <span>Pick a date</span>
                        )}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                        classNames={{
                            day_range_start: "bg-blue-400"
                        }}
                        initialFocus
                        mode="range"
                        defaultMonth={date?.from}
                        selected={date}
                        onSelect={setDate}
                        numberOfMonths={2}
                    />
                </PopoverContent>
            </Popover>
        </div>
    )
}
