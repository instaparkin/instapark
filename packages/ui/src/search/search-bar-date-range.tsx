"use client"

import * as React from "react"
import { addDays, format, setHours, setMinutes } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { DateRange } from "react-day-picker"

import { cn } from "../utils/cn"
import { Button } from "../components/button"
import { Calendar } from "../components/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../components/popover"
import { Input } from "../components/input"

export function SearchBarDateRange({
  className,
}: React.HTMLAttributes<HTMLDivElement>) {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(2024, 0, 20),
    to: addDays(new Date(2024, 0, 20), 20),
  })
  const [startTime, setStartTime] = React.useState("12:00")
  const [endTime, setEndTime] = React.useState("12:00")

  const getDateTimeWithTime = (date: Date | undefined, time: string) => {
    if (!date) return undefined
    const [hours, minutes] = time.split(":").map(Number)
    return setMinutes(setHours(date, hours), minutes)
  }

  const startDateTime = getDateTimeWithTime(date?.from, startTime)
  const endDateTime = getDateTimeWithTime(date?.to, endTime)

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[180px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon />
            {date?.from ? (
              date.to ? (
                <>
                  {format(startDateTime!, "LLL dd")} - {" "}
                  {format(endDateTime!, "LLL dd")}
                </>
              ) : (
                <>
                  {format(startDateTime!, "LLL dd")}
                </>
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="center">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
          />
          <div className="flex p-3 gap-2">
            <Input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
            <Input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}