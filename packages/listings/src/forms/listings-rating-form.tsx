"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { listingsRatingSchema } from "./listings-rating-schema"
import z from "zod"

export type ListingsRatingType = z.infer<typeof listingsRatingSchema>

export const ListingsRatingForm = () => useForm<ListingsRatingType>({
    resolver: zodResolver(listingsRatingSchema),
})
