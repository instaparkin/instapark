"use client"

import React from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { VendorCreateSchema, z } from '@instapark/schemas'
import { useForm } from 'react-hook-form'

export type VendorCreateFormType = z.infer<typeof VendorCreateSchema>

export const VendorCreateForm = () => useForm<VendorCreateFormType>({
    resolver: zodResolver(VendorCreateSchema),
    defaultValues: {
        vendor_id: "",
        name: "customer",
        email: "example@gmail.com",
        phone: "9876543210",
        bank: {
            account_number: "12345678890",
            account_holder: "John Doe",
            ifsc: "YESB0000262"
        },
        kyc_details: {
            pan : "AFDHK1234F"
        }
    }
})
