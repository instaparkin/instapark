"use client"

import React from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { VendorCreateSchema, z } from '@instapark/schemas'
import { useForm } from 'react-hook-form'
import { useAuth } from '../hooks/use-auth'
import { formatName } from '../utils/field-name'
import { getEnv, uuidToAlphanumeric } from "@instapark/common";
import { useQuery } from '@apollo/client'
import { GET_VENDOR } from '../graphql/get-vendor'
import { Vendor } from '@instapark/types'

export type VendorCreateFormType = z.infer<typeof VendorCreateSchema>

export const VendorCreateForm = () => {
    const { userId } = useAuth();
    const { data } = useQuery(GET_VENDOR, {
        variables: {
            vendorId: uuidToAlphanumeric(userId)
        }
    })
    const vendor = data?.VendorQuery?.getVendor;

    const form = useForm<VendorCreateFormType>({
        resolver: zodResolver(VendorCreateSchema),
        defaultValues: {
            vendor_id: vendor?.vendor_id as string,
            name: vendor?.name as string,
            email: vendor?.email as string,
            phone: vendor?.phone as string,
            bank: {
                account_number: getEnv() === "production" ? "" : "026291800001191",
                account_holder: getEnv() === "production" ? vendor?.name as string : "JOHN DOE",
                ifsc: getEnv() === "production" ? "" : "YESB0000262"
            },
            kyc_details: {
                pan: getEnv() === "production" ? vendor?.kyc_details?.pan as string : "ABCPV1234D"
            }
        }
    });

    React.useEffect(() => {
        if (data?.VendorQuery?.getVendor) {
            form.reset({ ...data.VendorQuery.getVendor as Vendor })
        }
    }, [data])

    return {
        form
    }
}