"use client"

import React from 'react'
import { Path, UseFormReturn } from 'react-hook-form'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../components/form'
import { Input } from '../components/input'
import { Button } from '../components/button'

export const ListingsStep = <T extends Record<string, unknown>>({ form, subSteps, name }: { name: string, form: UseFormReturn<T>, subSteps: { name: string, fields: Path<T>[] }[] }) => {
    return (
        <div>
            {name}
            {
                subSteps.map((subStep, index) => {
                    return (
                        <div key={index}>
                            <h1>{subStep.name}</h1>
                            <div className='grid grid-cols-2 gap-4'>
                                {
                                    subStep.fields.map((field, index) => {
                                        return (
                                            <div>
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
                                            </div>
                                        )
                                    })
                                }
                                <div className='flex justify-end'>
                                    <Button
                                        onClick={async (e) => {
                                            e.preventDefault()
                                            await form.trigger(subStep.fields);
                                        }}
                                    >
                                        Next
                                    </Button>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}
