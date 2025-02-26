"use client";
import React from "react";
import { Input } from "./input";
import { Label } from "./label";
import { ClockIcon } from "lucide-react";
import { useId, useState } from "react";
import { Calendar } from "./calendar";
import { dateToUnixSec, unixSecToMonthYearTime } from "../utils/dayjs";
import { ControllerRenderProps, Path } from "react-hook-form";

interface DateTimePickerProps<T extends Record<string, unknown>> {
  field: ControllerRenderProps<T, Path<T>>

}

export function DateTimePicker<T extends Record<string, unknown>>({ field }: DateTimePickerProps<T>) {
  const id = useId();
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <div className="rounded-md border w-fit">
      <Calendar mode="single" className="p-2" selected={date} onSelect={setDate} />
      <div className="border-t p-3">
        <div className="flex items-center gap-3">
          <Label htmlFor={id} className="text-xs">
            Enter time
          </Label>
          <div className="relative grow">
            <Input
              {...field}
              id={id}
              type="time"
              step="1"
              defaultValue="12:00:00"
              className="peer appearance-none ps-9 [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
            />
            <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
              <ClockIcon size={16} aria-hidden="true" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
