"use client"

import React, { useEffect } from 'react'
import { VendorCreateForm, VendorCreateFormType } from '../forms/vendor-create-form'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../components/form';
import { Input } from '../components/input';
import { fieldName } from '../utils/field-name';
import { Button } from '../components/button';
import { useMutation } from '@apollo/client';
import { CREATE_VENDOR } from '../graphql/create-vendor';
import toast from 'react-hot-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/card';
import { SideBarLayout } from '../components/sidebar-layout';
import { Badge } from '../components/badge';
import { paymentDetailsSteps } from './payment-details-steps';
import { SidebarForm } from '../components/sidebar-form';

export const PaymentDetailsMain = () => {
    const { form } = VendorCreateForm();
    const [createVendor, { data, loading, error }] = useMutation(CREATE_VENDOR);

    useEffect(() => {
        if (data) {
            toast.success(data.VendorMutation?.createVendor as string);
        }
    }, [data])

    const onSubmit = (data: VendorCreateFormType) => {
        if (loading) {
            toast.loading("Submitting Payment details");
        }

        if (error) {
            toast.error(`Submission error! ${error.message}`)
        }

        const request = {
            ...data,
        }
        createVendor({
            variables: request
        })
    }

    return (
       <SidebarForm groups={paymentDetailsSteps} form={form} />
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