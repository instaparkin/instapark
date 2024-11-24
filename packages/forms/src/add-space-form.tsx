"use client"

import { useForm } from "react-hook-form";
import { addSpaceSchema } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";

export type AddSpaceType = z.infer<typeof addSpaceSchema>

export const addSpaceForm = () => useForm<AddSpaceType>({
    resolver: zodResolver(addSpaceSchema),
})