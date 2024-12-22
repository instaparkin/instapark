"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { listingsAddSchema } from "./listings-add-schema";
import z from "zod";

export type ListingsAddType = z.infer<typeof listingsAddSchema>

export const ListingsAddForm = () => useForm<ListingsAddType>({
    resolver: zodResolver(listingsAddSchema),
    defaultValues: {
        place: {
            type: "House"
        }
    }
})
