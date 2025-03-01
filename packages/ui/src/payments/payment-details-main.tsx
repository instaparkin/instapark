"use client"

import React from 'react'
import { VendorCreateForm, VendorCreateFormType } from '../forms/vendor-create-form'
import { useMutation } from '@apollo/client';
import { CREATE_VENDOR } from '../graphql/create-vendor';
import toast from 'react-hot-toast';
import { paymentDetailsSteps } from './payment-details-steps';
import { SidebarForm } from '../components/sidebar-form';

export const PaymentDetailsMain = () => {
    const { form } = VendorCreateForm();
    const [createVendor] = useMutation(CREATE_VENDOR, {
        onCompleted: (data) => {
            toast.success(data.VendorMutation?.createVendor as string)
        },
        onError: (error) => {
            toast.error(`${error}`);
        }
    });

    const onSubmit = (data: VendorCreateFormType) => {
        const request = {
            ...data,
        }
        createVendor({
            variables: request
        })
    }

    return (
        <SidebarForm
            groups={paymentDetailsSteps}
            form={form}
            onSubmit={(data) => {
                onSubmit(data)
            }} />
    )
}