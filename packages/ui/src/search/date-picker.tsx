"use client"

import { useRange } from 'react-instantsearch';
import { Popover, PopoverContent, PopoverTrigger } from '../components/popover';
import { Button } from '../components/button';
import { useState } from 'react';
import { CalendarIcon } from 'lucide-react';
import { Calendar } from '../components/calendar';
import { dateToUnixSec, unixSecToISO, unixSecToMonthYear } from '../utils/dayjs';
import dayjs from 'dayjs';

interface DateRange {
  from?: number;
  to?: number;
}

export const DateRangeFilter: React.FC<{ attribute: string }> = ({ attribute }) => {
  const { range, refine, canRefine } = useRange({ attribute });
  
  const [date, setDate] = useState<DateRange>({
    from: range.min,
    to: dateToUnixSec(dayjs().add(4, 'day').toDate()),
  });

  const handleApply = () => {
    if (date.to) {
      // Refine the range, including all items <= date.to
      refine([range.min, date.to]);
    }
  };

  return (
    <div className="flex-1 w-fit truncate max-w-64">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-full justify-start h-[46px] rounded-none rounded-r-md border text-left font-normal"
          >
            <CalendarIcon className="mr-2 h-4 w-4 shrink-0" />
            {date.to ? (
              <span>
                {unixSecToMonthYear(date.from || range.min)} - {unixSecToMonthYear(date.to)}
              </span>
            ) : (
              <span>All Dates</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            disabled={(date) => {
              const unixDate = dateToUnixSec(date);
              return unixDate < (range.min || 0);
            }}
            initialFocus
            mode="range"
            defaultMonth={unixSecToISO(date?.from || range.min)}
            selected={{
              from: unixSecToISO(date?.from || range.min),
              to: unixSecToISO(date?.to || range.max),
            }}
            onSelect={(d) => {
              setDate({
                from: dateToUnixSec(d?.from as Date),
                to: dateToUnixSec(d?.to as Date),
              });
            }}
            numberOfMonths={2}
            className="border-0"
          />
          <div className="flex items-center justify-between p-3 border-t">
            <Button
              variant="ghost"
              onClick={() => {
                setDate({
                  from: range.min,
                  to: range.max,
                });
              }}
            >
              Reset
            </Button>
            <Button onClick={handleApply}>Apply</Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};
