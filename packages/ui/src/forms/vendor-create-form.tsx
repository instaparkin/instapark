"use client"

import React from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { VendorCreateSchema, z } from '@instapark/schemas'
import { useForm } from 'react-hook-form'
import { useAuth } from '../hooks/use-auth'
import { getEnv, uuidToAlphanumeric } from "@instapark/common";
import { useQuery } from '@apollo/client'
import { GET_VENDOR } from '../graphql/get-vendor'
import { formatName } from '../utils/field-name'

export type VendorCreateFormType = z.infer<typeof VendorCreateSchema>

export const VendorCreateForm = () => {
    const { userId, firstName, lastName, email, phoneNumber } = useAuth();
    const { data } = useQuery(GET_VENDOR, {
        variables: {
            vendorId: uuidToAlphanumeric(userId)
        }
    })
    const vendor = data?.VendorQuery?.getVendor;

    const form = useForm<VendorCreateFormType>({
        resolver: zodResolver(VendorCreateSchema)
    });

    React.useEffect(() => {
        if (data?.VendorQuery?.getVendor) {
            form.reset({
                vendor_id: uuidToAlphanumeric(userId),
                kyc_details: {
                    pan: getEnv() === "production" ? vendor?.related_docs?.at(1)?.doc_value as string : "ABCPV1234D"
                },
                name: formatName(firstName, lastName),
                email: email as string,
                phone: phoneNumber as string,
                bank: {
                    account_number: getEnv() === "production" ? vendor?.bank?.account_number as string : "026291800001191",
                    account_holder: getEnv() === "production" ? vendor?.bank?.account_holder as string: "JOHN DOE",
                    ifsc: getEnv() === "production" ? vendor?.bank?.ifsc as string : "YESB0000262"
                },
            })
        }
    }, [data])

    return {
        form
    }
}