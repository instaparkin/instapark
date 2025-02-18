"use client";

import React from "react";
import { LuHotel } from "react-icons/lu";
import { PiCastleTurret } from "react-icons/pi";
import { MdOutlineCabin } from "react-icons/md";
import { PiBarn } from "react-icons/pi";
import { BsHouseDoor } from "react-icons/bs";
import { UseFormReturn } from "react-hook-form";
import { PiFarm } from "react-icons/pi";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../components/form";
import { RadioGroup, RadioGroupItem } from "../components/radio-group";
import {  ListingRequest, PlaceType } from "@instapark/types";

export type PlaceTypeWithIcon = {
  type: PlaceType;
  icon: React.ReactNode;
};

const placetypes: PlaceTypeWithIcon[] = [
  {
    type: PlaceType.House,
    icon: <BsHouseDoor className="h-10 w-10" />,
  },
  {
    type: PlaceType.Hotel,
    icon: <LuHotel className="h-10 w-10" />,
  },
  {
    type: PlaceType.Castle,
    icon: <PiCastleTurret className="h-10 w-10" />,
  },
  {
    type: PlaceType.Cabin,
    icon: <MdOutlineCabin className="h-10 w-10" />,
  },
  {
    type: PlaceType.Barn,
    icon: <PiBarn className="h-10 w-10" />,
  },
  {
    type: PlaceType.Farm,
    icon: <PiFarm className="h-10 w-10" />,
  },
];

export const ListingsAddPlaceType = ({ form }: { form: UseFormReturn<ListingRequest> }) => {
  return (
    <FormField
      control={form.control}
      name="type"
      render={({ field }) => (
        <FormItem>
          <FormControl className='w-full'>
            <RadioGroup
              onValueChange={field.onChange}
              defaultValue={field.value}
              className="grid grid-cols-2 w-fit max-w-[630px] mx-auto"
            >
              {placetypes.map((p) => (
                <FormItem key={p.type} className="flex mx-auto items-center">
                  <FormControl>
                    <RadioGroupItem value={p.type} className='sr-only' />
                  </FormControl>
                  <FormLabel
                    className={`flex items-center justify-between p-10 rounded-xl border-2 transition-colors cursor-pointer
                                                    ${field.value === p.type
                        ? "border-primary bg-muted"
                        : "border-muted hover:border-primary/50"
                      }`}
                  >
                    <div className="flex flex-col gap-2 items-center">
                      <span>{p.type}</span>
                      <span>{p.icon}</span>
                    </div>
                  </FormLabel>
                </FormItem>
              ))}
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
};
