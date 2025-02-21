"use client"

import React, { useEffect } from 'react'
import { VendorCreateForm, VendorCreateFormType } from '../forms/vendor-create-form'
import { VendorCreateFormElements } from '../types/vendor-create-form-types';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../components/form';
import { Input } from '../components/input';
import { fieldName } from '../utils/field-name';
import { Button } from '../components/button';
import { Alert, AlertDescription, AlertTitle } from '../components/alert';
import { useMutation } from '@apollo/client';
import { CREATE_VENDOR } from '../graphql/create-vendor';
import toast from 'react-hot-toast';
import { useAuth } from '../hooks/use-auth';
import { useVendor } from '../hooks/use-vendor';

export const CreateVendor = () => {
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

    const createVendorFormElements: VendorCreateFormElements<VendorCreateFormType> = {
        fields: [
            { name: "name", type: 'text' },
            { name: "phone", type: "text" },
            { name: "email", type: "email" },
            { name: "bank.account_holder", type: "text" },
            { name: "bank.account_number", type: "text" },
            { name: "bank.ifsc", type: "text" },
            { name: "kyc_details.pan", type: "text" }
        ]
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
    type ApprovalStatus = "Not applied" | "Waiting For Approval" | "Approved" | "Rejected"

    const asdsas: ApprovalStatus = "Rejected";

    return (
        <div className='max-w-2xl mx-auto space-y-6'>
            <Alert className='flex items-center justify-center' variant={asdsas}>
                <AlertTitle>{vendorInfo?.status ?? "asdsa"}</AlertTitle>
            </Alert>
            <Form {...form}>
                <form className='space-y-6' onSubmit={form.handleSubmit(onSubmit)}>
                    {
                        createVendorFormElements.fields.map((f, i) => (
                            <FormField
                                key={i}
                                control={form.control}
                                name={f.name}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            {fieldName(f.name)}
                                        </FormLabel>
                                        <FormControl>
                                            <Input className='py-8' type={f.type} {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        ))
                    }
                    <Button type="submit">Request Approval</Button>
                </form>
            </Form>
        </div >
    )
}
