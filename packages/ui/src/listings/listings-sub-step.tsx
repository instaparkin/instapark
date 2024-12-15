"use client"

import React from 'react'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../components/form'
import { Input } from '../components/input'
import { FieldValues, Path, UseFormReturn } from 'react-hook-form'

export const ListingsSubStep = <T extends Record<string, unknown>>({ form, fields }: { form: UseFormReturn<T>, fields: Path<T>[] }) => {
    return (
        <div className='grid grid-cols-2 gap-4'>
            {
                fields.map((field, index) => {
                    return (
                        <FormField
                            key={index}
                            control={form.control}
                            name={field}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{field.name.split('.')[1]?.charAt(0)?.toUpperCase() as string + field.name.split('.')[1]?.slice(1)}</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    )
                })
            }
        </div>
    )
}
