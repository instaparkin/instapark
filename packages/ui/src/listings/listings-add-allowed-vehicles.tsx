import React from 'react';
import { Input } from '../components/input';
import { Button } from '../components/button';
import { UseFormReturn } from 'react-hook-form';
import { ListingsAddType, AllowedVehicle } from '@instapark/listings';
import {
    MultiSelector,
    MultiSelectorContent,
    MultiSelectorInput,
    MultiSelectorItem,
    MultiSelectorList,
    MultiSelectorTrigger,
} from '../components/multi-select';

export const ListingsAddAllowedVehicles = ({ form }: { form: UseFormReturn<ListingsAddType> }) => {
    const handleValuesChange = (value: string) => {
        const currentValues = form.getValues("allowedVehicles") || [];
        if (!currentValues.includes(value as AllowedVehicle)) {
            form.setValue("allowedVehicles", [...currentValues, value as AllowedVehicle]);
        }
    };

    return (
        <div className="space-y-4">
            <MultiSelector
                values={form.getValues("allowedVehicles")}
                onValuesChange={() => handleValuesChange}
                loop
                className="max-w-xs"
            >
                <MultiSelectorTrigger>
                    <MultiSelectorInput placeholder="Select allowed vehicles" />
                </MultiSelectorTrigger>
                <MultiSelectorContent>
                    <MultiSelectorList>
                        <MultiSelectorItem value="React">React</MultiSelectorItem>
                        <MultiSelectorItem value="Vue">Vue</MultiSelectorItem>
                        <MultiSelectorItem value="Svelte">Svelte</MultiSelectorItem>
                    </MultiSelectorList>
                </MultiSelectorContent>
            </MultiSelector>
        </div>
    );
};
