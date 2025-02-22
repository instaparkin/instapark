"use client"

import React, { useEffect } from 'react'
import { VendorCreateForm, VendorCreateFormType } from '../forms/vendor-create-form'
import { VendorCreateFormElements } from '../types/vendor-create-form-types';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, useFormField } from '../components/form';
import { Input } from '../components/input';
import { fieldName } from '../utils/field-name';
import { Button, buttonVariants } from '../components/button';
import { useMutation } from '@apollo/client';
import { CREATE_VENDOR } from '../graphql/create-vendor';
import toast from 'react-hot-toast';
import { useVendor } from '../hooks/use-vendor';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/card';
import { SideBarLayout } from '../components/sidebar-layout';
import { Badge } from '../components/badge';
import { paymentDetailsSteps } from './payment-details-steps';
import { cn } from '../utils/cn';
import { cva } from 'class-variance-authority';

export const PaymentDetailsMain = () => {
    const form = VendorCreateForm();
    const [createVendor, { data, loading, error }] = useMutation(CREATE_VENDOR);
    const { vendorInfo, loading: VendorDetailsLoading } = useVendor({
        vendorId: "992"
    })

    useEffect(() => {
        if (data) {
            toast.success(data.VendorMutation.createVendor);
        }
    }, [data])

    if (error) {
        return toast.error(`Submission error! ${error.message}`)
    }
    const onSubmit = (data: VendorCreateFormType) => {
        const request = {
            ...data,
            vendor_id: "991"
        }

        createVendor({
            variables: request
        })
    }

    return (
        <SideBarLayout sidebarNavItems={paymentDetailsSteps.map(p => p)}>
            <div className='max-w-2xl mx-auto space-y-6'>
                <Form {...form}>
                    <form className='space-y-10' onSubmit={form.handleSubmit(onSubmit)}>
                        {
                            paymentDetailsSteps.map((d, i) => (
                                <div id={d.title.toLowerCase()} className='space-y-6' key={i}>
                                    <div className='flex items-center justify-between'>
                                        <h2 className='text-lg font-semibold'>{d.title}</h2>
                                        <Badge variant={d.status === "VERIFIED" ? "positive" : "negative"}>
                                            {d.status}</Badge>
                                    </div>
                                    {
                                        d.fields.map((f, i) => (
                                            <Card id={f.name} className='rounded-sm'>
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
                                                                    <Input className='max-w-xs' type={f.type} {...field} />
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
                        <Button  type="submit">Request Approval</Button>
                    </form>
                </Form>
            </div >
        </SideBarLayout>
    )
}

export const sidebarNavItems = [
    {
        title: "Personal",
        href: "#name",
    },
    {
        title: "Bank",
        href: "#bank.account_holder",
    },
    {
        title: "KYC",
        href: "#kyc_details.pan",
    },
]