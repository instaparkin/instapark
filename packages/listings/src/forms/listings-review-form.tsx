"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { listingsReviewSchema } from "./listings-review-schema";
import z from "zod";

export type ListingsReviewType = z.infer<typeof listingsReviewSchema>;

export const ListingsReviewForm = () => useForm<ListingsReviewType>({
    resolver: zodResolver(listingsReviewSchema),
});
