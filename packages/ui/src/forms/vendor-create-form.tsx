"use client"

import { zodResolver } from '@hookform/resolvers/zod'
import { VendorCreateSchema, z } from '@instapark/schemas'
import { useForm } from 'react-hook-form'
import { useAuth } from '../hooks/use-auth'
import { formatName } from '../utils/field-name'
import { getEnv } from "@instapark/common";

export type VendorCreateFormType = z.infer<typeof VendorCreateSchema>

export const VendorCreateForm = () => {
    const { userId, firstName, lastName, emails, phoneNumber } = useAuth();
    return {
        form: useForm<VendorCreateFormType>({
            resolver: zodResolver(VendorCreateSchema),
            defaultValues: {
                vendor_id: userId,
                name: formatName(firstName, lastName),
                email: emails?.at(0),
                phone: phoneNumber,
                bank: {
                    account_number: getEnv() === "production" ? "" : "026291800001191",
                    account_holder: getEnv() === "production" ? formatName(firstName, lastName) : "Jhon Doe",
                    ifsc: getEnv() === "production" ? "" : "YESB0000262"
                },
                kyc_details: {
                    pan: getEnv() === "production" ? "" : "ABCPV1234D"
                }
            }
        })
    }
}