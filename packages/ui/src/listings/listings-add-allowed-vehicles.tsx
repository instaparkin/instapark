"use client";

import { UseFormReturn, useFieldArray } from "react-hook-form";
import {
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "../components/form";
import { ListingsAddType } from "@instapark/listings";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/select";
import { Button } from "../components/button";
import { Car, BikeIcon, LucideProps, Cylinder } from 'lucide-react';
import { type Vehicle } from "@instapark/types";
import { ForwardRefExoticComponent, RefAttributes } from "react";

const vehicleIcons: Record<Vehicle, ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>> = {
    Car: Car,
    Bike: BikeIcon,
    Cycle: Cylinder,
};

export function ListingsAddAllowedVehicles({ form }: { form: UseFormReturn<ListingsAddType> }) {
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
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="Select a vehicle" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {Object.keys(vehicleIcons).map((vehicle) => {
                                            const Icon = vehicleIcons[vehicle];
                                            return (
                                                <SelectItem key={vehicle} value={vehicle as string}>
                                                    <div className="flex items-center">
                                                        <Icon className="mr-2 h-4 w-4" />
                                                        {vehicle}
                                                    </div>
                                                </SelectItem>
                                            );
                                        })}
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
                    onClick={() => append({ vehicle: Car })}
                >
                    Add Vehicle
                </Button>
            )}
        </div>
    );
}
