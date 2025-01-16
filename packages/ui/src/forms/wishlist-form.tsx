"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { wishListSchema } from "../../../schemas/src/wishlist/wishlist-create-schema";
import z from "zod";

export type WishListFormType = z.infer<typeof wishListSchema>

export const WishListForm = () =>
    useForm<WishListFormType>({
        resolver: zodResolver(wishListSchema),
    })
