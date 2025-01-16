"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { createPaymentSchema } from "../../../schemas/src/payment/payment-schema"

export type createPaymentType = z.infer<typeof createPaymentSchema>

export const createPaymentForm = () => useForm<createPaymentType>({
    resolver: zodResolver(createPaymentSchema),
    defaultValues: {
        firstname: "",
        email: "",
        phone: "",
    },
})
