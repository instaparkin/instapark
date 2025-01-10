import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { wishListSchema } from "./wishlist-schema";
import z from "zod";

export type WishListFormType = z.infer<typeof wishListSchema>

export const WishListForm = () => useForm<WishListFormType>({
    resolver: zodResolver(wishListSchema),
})
