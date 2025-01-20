"use client";

import React from "react";
import { UseFormReturn, useFieldArray } from "react-hook-form";
import {
    FormControl,
    FormField,
    FormItem,
} from "../components/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../components/select";
import { Button } from "../components/button";
import { Car, BikeIcon, Cylinder } from "lucide-react";
import { Listing, ListingRequest, Vehicle } from "@instapark/types";

const vehicleIcons: Record<Vehicle, React.ReactNode> = {
    "Car": <Car className="w-4 h-4 mr-2" />,
    "Bike": <BikeIcon className="w-4 h-4 mr-2" />,
    "Cycle": <Cylinder className="w-4 h-4 mr-2" />,
};

export function ListingsAddAllowedVehicles({ form }: { form: UseFormReturn<ListingRequest> }) {
    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "allowedVehicles",
    });

    return (
        <div className="space-y-4">
            {fields.map((field, index) => (
                <FormField
                    key={field.id}
                    control={form.control}
                    name={`allowedVehicles.${index}.vehicle`}
                    render={({ field }) => (
                        <FormItem className="flex items-center space-x-2 mt-2">
                            <FormControl>
                                <Select
                                    onValueChange={field.onChange}
                                    value={field.value} // Ensure the value is controlled
                                >
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="Select a vehicle" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {Object.keys(vehicleIcons).map((vehicleKey) => (
                                            <SelectItem key={vehicleKey} value={vehicleKey}>
                                                <div className="flex items-center">
                                                    {vehicleIcons[vehicleKey as Vehicle]}
                                                    {vehicleKey}
                                                </div>
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => remove(index)}
                            >
                                Remove
                            </Button>
                        </FormItem>
                    )}
                />
            ))}
            {fields.length < 3 && (
                <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => append({ vehicle: Vehicle.Car})} 
                >
                    Add Vehicle
                </Button>
            )}
        </div>
    );
}
