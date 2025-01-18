"use client"

import * as React from "react"
import { addDays, format } from "date-fns"
import { CalendarIcon, Search, SlidersHorizontal, X } from 'lucide-react'
import { DateRange } from "react-day-picker"

import { cn } from "../utils/cn"
import { Button } from "../components/button"
import { Calendar } from "../components/calendar"
import { Input } from "../components/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../components/popover"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../components/sheet"
import {
  Card,
  CardContent,
} from "../components/card"

export function SearchHeader() {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(2024, 0, 20),
    to: addDays(new Date(2024, 0, 20), 20),
  })

  console.log(date?.from);
  
  const [isOpen, setIsOpen] = React.useState(false)

  const DatePickerContent = () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <h3 className="text-sm font-medium">Check in</h3>
        <Calendar
          initialFocus
          mode="range"
          defaultMonth={date?.from}
          selected={date}
          onSelect={setDate}
          numberOfMonths={1}
          className="rounded-md border"
        />
      </div>
      <div className="space-y-2">
        <h3 className="text-sm font-medium">Check out</h3>
        <Calendar
          initialFocus
          mode="range"
          defaultMonth={date?.to}
          selected={date}
          onSelect={setDate}
          numberOfMonths={1}
          className="rounded-md border"
        />
      </div>
    </div>
  )

  return (
    <>
      {/* Desktop View */}
      <Card className="w-full mx-auto hidden md:block">
        <CardContent className="flex items-center gap-2 p-2">
          <div className="h-8 w-[1px] bg-border" />
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                className={cn(
                  "flex-1 justify-start font-normal hover:bg-transparent",
                  !date && "text-muted-foreground"
                )}
              >
                {date?.from ? (
                  <div className="flex items-center gap-2">
                    <CalendarIcon className="h-4 w-4" />
                    <div className="flex flex-col items-start">
                      <span className="text-xs text-muted-foreground">Check in</span>
                      <span className="text-sm">{format(date.from, "MMM d")}</span>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <CalendarIcon className="h-4 w-4" />
                    <span>Add dates</span>
                  </div>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto" align="start">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={date?.from}
                selected={date}
                onSelect={setDate}
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>
          <div className="h-8 w-[1px] bg-border" />
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                className={cn(
                  "flex-1 justify-start font-normal hover:bg-transparent",
                  !date && "text-muted-foreground"
                )}
              >
                {date?.to ? (
                  <div className="flex items-center gap-2">
                    <CalendarIcon className="h-4 w-4" />
                    <div className="flex flex-col items-start">
                      <span className="text-xs text-muted-foreground">Check out</span>
                      <span className="text-sm">{format(date.to, "MMM d")}</span>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <CalendarIcon className="h-4 w-4" />
                    <span>Add dates</span>
                  </div>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto" align="start">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={date?.from}
                selected={date}
                onSelect={setDate}
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>
        </CardContent>
      </Card>

      {/* Mobile View */}
      <Card className="w-full mx-auto md:hidden">
        <CardContent className="p-2">
          <div className="flex flex-col gap-2">

            <div className="flex gap-2">
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline" className="flex-1 justify-start">
                    <CalendarIcon className="h-4 w-4 mr-2" />
                    {date?.from && date?.to ? (
                      <span>
                        {format(date.from, "MMM d")} - {format(date.to, "MMM d")}
                      </span>
                    ) : (
                      <span>Add dates</span>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent side="bottom" className="h-[90vh]">
                  <SheetHeader>
                    <SheetTitle>Select dates</SheetTitle>
                  </SheetHeader>
                  <div className="mt-4">
                    <DatePickerContent />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 border-t bg-background">
                    <Button onClick={() => setIsOpen(false)} className="w-full">
                      Done
                    </Button>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  )
}

