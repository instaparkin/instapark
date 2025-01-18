"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import { wishListCreateSchema } from "@instapark/schemas";

export type WishListFormType = z.infer<typeof wishListCreateSchema>

export const WishListCreateForm = () =>
    useForm<WishListFormType>({
        resolver: zodResolver(wishListCreateSchema),
    })
