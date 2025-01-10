"use client";

import { UseFormReturn, useFieldArray } from "react-hook-form";
import {
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "../components/form";
import { ListingsAddType } from "@instapark/listings";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../components/select";
import { Button } from "../components/button";
import { Car, BikeIcon, Cylinder } from "lucide-react";
import { Vehicle } from "@instapark/types";
import { ReactNode } from "react";

const vehicleIcons: Record<Vehicle, unknown> = {
    [Vehicle.Car]: <Car className="w-4 h-4 mr-2" />,
    [Vehicle.Bike]: <BikeIcon className="w-4 h-4 mr-2" />,
    [Vehicle.Cycle]: <Cylinder className="w-4 h-4 mr-2" />,
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
                                        {Object.values(Vehicle).map((vehicle) => (
                                            <SelectItem key={vehicle} value={vehicle}>
                                                <div className="flex items-center">
                                                    {vehicleIcons[vehicle as Vehicle]}
                                                    {vehicle}
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
                    onClick={() => append({ vehicle: Vehicle.Car })}
                >
                    Add Vehicle
                </Button>
            )}
        </div>
    );
}
