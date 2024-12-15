"use client";

import React from "react";
import { RadioGroup, RadioGroupItem } from "../components/radio-group";
import { Label } from "../components/label";
import { ListingsAddType, PlaceType } from "@instapark/listings";
import { LuHotel } from "react-icons/lu";
import { PiCastleTurret } from "react-icons/pi";
import { MdOutlineCabin } from "react-icons/md";
import { PiBarn } from "react-icons/pi";
import { BsHouseDoor } from "react-icons/bs";
import { Checkbox } from "../components/checkbox";
import { UseFormReturn } from "react-hook-form";
import { Card, CardDescription, CardHeader, CardTitle } from "../components/card";
import { PiFarm } from "react-icons/pi";
import { UploadThingButton } from "./uploadthing";

export type PlaceTypeWithIcon = {
  type: PlaceType;
  icon: React.ReactNode;
};

const placetypes: PlaceTypeWithIcon[] = [
  {
    type: "House",
    icon: <BsHouseDoor className="h-10 w-10" />,
  },
  {
    type: "Hotel",
    icon: <LuHotel className="h-10 w-10" />,
  },
  {
    type: "Castle",
    icon: <PiCastleTurret className="h-10 w-10" />,
  },
  {
    type: "Cabin",
    icon: <MdOutlineCabin className="h-10 w-10" />,
  },
  {
    type: "Barn",
    icon: <PiBarn className="h-10 w-10" />,
  },
  {
    type: "Farm",
    icon: <PiFarm className="h-10 w-10" />,
  },
];

export const ListingsAddPlaceType = ({ form }: { form: UseFormReturn<ListingsAddType> }) => {

  const onPlaceTypeChange = (placeType: PlaceTypeWithIcon) => {
    form.setValue("place.type", placeType.type);
  };

  return (
    <div className="grid grid-cols-2 gap-2 w-fit mx-auto">
      {
        placetypes.map((placeType) => (
          <Card
            onClick={() => onPlaceTypeChange(placeType)}
            key={placeType.type}
            className={`cursor-pointer h-36 w-32 sm:w-36 border flex flex-col gap-2 items-center justify-center rounded-md ${form.getValues("place.type") === placeType.type ? " border-2 border-black bg-neutral-100" : "border-2 hover:border-black"}`}>
            <CardHeader>
              <CardTitle>
                {placeType.icon}
              </CardTitle>
              <CardDescription className="text-base text-accent-foreground font-semibold">
                {placeType.type}
              </CardDescription>
            </CardHeader>
          </Card>
        ))
      }
    </div>
  )
};
