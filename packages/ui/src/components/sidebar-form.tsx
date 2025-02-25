import React, { HTMLInputTypeAttribute } from 'react'
import { SideBarLayout } from './sidebar-layout'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './form'
import { Badge } from './badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './card'
import { Input } from './input'
import { Button } from './button'
import { Path, UseFormReturn } from 'react-hook-form'
import { fieldName } from '../utils/field-name'

export type Field<T extends Record<string, unknown>> = {
    name: Path<T>;
    disabled?: boolean,
    description: string
    type: HTMLInputTypeAttribute
}

export type Group<T extends Record<string, unknown>> = {
    title: string;
    href: string;
    component?: ({ form }: { form: UseFormReturn<T> }) => JSX.Element;
    fields: Field<T>[]
}

interface SidebarFormProps<T extends Record<string, unknown>> {
    groups: Group<T>[]
    form: UseFormReturn<T>
    onSubmit?: (data: T) => void
}

export const SidebarForm = <T extends Record<string, unknown>>
    ({ groups, form, onSubmit }: SidebarFormProps<T>) => {
    return (
        <SideBarLayout sidebarNavItems={groups.map(p => p)}>
            <div className='max-w-2xl mx-auto space-y-6'>
                <Form {...form}>
                    <form className='space-y-10' onSubmit={form.handleSubmit((data) => onSubmit?.(data))}>
                        {
                            groups.map((d, i) => (
                                <div id={d.title.toLowerCase()} className='space-y-6' key={i}>
                                    <div className='flex items-center justify-between'>
                                        <h2 className='text-lg font-semibold'>{d.title}</h2>
                                    </div>
                                    {
                                        d.fields.map((f, i) => (
                                            <Card key={i} id={f.name} className='rounded-sm'>
                                                <FormField
                                                    key={i}
                                                    control={form.control}
                                                    name={f.name}
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <CardHeader>
                                                                <FormLabel>
                                                                    <CardTitle className='text-xl'>
                                                                        {fieldName(f.name)}
                                                                    </CardTitle>
                                                                </FormLabel>
                                                                <CardDescription>
                                                                    {f.description}
                                                                </CardDescription>
                                                            </CardHeader>
                                                            <CardContent>
                                                                <FormControl>
                                                                    <Input className='max-w-xs' type={f.type} {...field} value={field.value as string} />
                                                                </FormControl>
                                                                <FormMessage />
                                                            </CardContent>
                                                        </FormItem>
                                                    )}
                                                />
                                            </Card>
                                        ))
                                    }
                                </div>
                            ))
                        }
                        <Button type="submit">Request Approval</Button>
                    </form>
                </Form>
            </div >
        </SideBarLayout>
    )
}
