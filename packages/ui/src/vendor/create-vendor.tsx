"use client"

import React from 'react'
import { VendorCreateForm, VendorCreateFormType } from '../forms/vendor-create-form'
import { VendorCreateFormElements } from '../types/vendor-create-form-types';
import { Form, FormControl, FormField, FormItem, FormLabel } from '../components/form';
import { Input } from '../components/input';
import { fieldName } from '../utils/field-name';
import { Button } from '../components/button';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "../components/accordion"
import { Alert, AlertDescription, AlertTitle } from '../components/alert';

export const CreateVendor = () => {
    const form = VendorCreateForm();

    const createVendorFormElements: VendorCreateFormElements<VendorCreateFormType> = {
        fields: [
            { name: "name", type: 'text' },
            { name: "phone", type: "number" },
            { name: "email", type: "email" },
            { name: "bank.account_holder", type: "text" },
            { name: "bank.account_number", type: "number" },
            { name: "bank.ifsc", type: "text" },
            { name: "kyc_details.pan", type: "text" }
        ]
    }
    const onSubmit = (data: VendorCreateFormType) => {
        console.log(data);
    }
    type ApprovalStatus = "Not applied" | "Waiting For Approval" | "Approved" | "Rejected"

    const asdsas: ApprovalStatus = "Rejected";

    return (
        <div className='max-w-2xl mx-auto space-y-6'>
            <Alert className='flex items-center justify-center' variant={asdsas}>
                <AlertTitle>{asdsas}</AlertTitle>
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
