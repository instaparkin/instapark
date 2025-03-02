"use client"

import React from 'react'
import { VendorCreateForm, VendorCreateFormType } from '../forms/vendor-create-form'
import { useMutation } from '@apollo/client';
import { CREATE_VENDOR } from '../graphql/create-vendor';
import toast from 'react-hot-toast';
import { paymentDetailsSteps } from './payment-details-steps';
import { SidebarForm } from '../components/sidebar-form';
import { useVendor } from '../hooks/use-vendor';

export const PaymentDetailsMain = () => {
    const { form } = VendorCreateForm();
    const { isVendor } = useVendor();

    const [createVendor] = useMutation(CREATE_VENDOR, {
        onCompleted: (data) => {
            toast.success(data?.VendorMutation?.createVendor as string);
        },
        onError: (error) => {
            toast.error(`Error: ${error.message}`);
        }
    });
    console.log(form.getValues());

    const onSubmit = (data: VendorCreateFormType) => {
        const request: VendorCreateFormType =
            { ...data };
        createVendor({ variables: request });
    };
    return (
        <SidebarForm
            diableForm={isVendor}
            groups={paymentDetailsSteps}
            form={form}
            onSubmit={onSubmit}
        />
    );
};
