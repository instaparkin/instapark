import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { listingsNotAvailableDatesSchema } from "./listings-not-available-dates-schema";
import z from "zod";

export type ListingsNotAvailableDatesType = z.infer<typeof listingsNotAvailableDatesSchema>

export const ListingsNotAvailableForm = () => useForm({
    resolver: zodResolver(listingsNotAvailableDatesSchema),
})
