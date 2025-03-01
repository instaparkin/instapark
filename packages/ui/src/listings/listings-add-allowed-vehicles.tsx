"use client"

import React from "react";
import {
  MultiSelector,
  MultiSelectorContent,
  MultiSelectorInput,
  MultiSelectorItem,
  MultiSelectorList,
  MultiSelectorTrigger,
} from "../components/multi-select";
import {
  FormField,
  FormItem,
  FormMessage,
} from "../components/form";
import {  UseFormReturn } from "react-hook-form";
import { ListingsAddType } from "../forms/listing-create-form";
import { Vehicle } from "@instapark/types";

const vehicles: { name: Vehicle }[] = [
  {
    name: Vehicle.Car,
  },
  {
    name: Vehicle.Bike,
  },
  {
    name: Vehicle.Cycle,
  },
];

interface ListingsAddAllowedVehiclesProps {
  form: UseFormReturn<ListingsAddType>
}

export const ListingsAddAllowedVehicles = ({ form }: ListingsAddAllowedVehiclesProps) => {
  return (
    <FormField
      control={form.control}
      name="allowedVehicles"
      render={({ field }) => (
        <FormItem className="w-full">
          <MultiSelector
            onValuesChange={field.onChange}
            values={field.value} >
            <MultiSelectorTrigger>
              <MultiSelectorInput placeholder="Add Vehicles" />
            </MultiSelectorTrigger>
            <MultiSelectorContent>
              <MultiSelectorList>
                {vehicles.map((v) => (
                  <MultiSelectorItem key={v.name} value={v.name}>
                    <span>{v.name}</span>
                  </MultiSelectorItem>
                ))}
              </MultiSelectorList>
            </MultiSelectorContent>
          </MultiSelector>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
