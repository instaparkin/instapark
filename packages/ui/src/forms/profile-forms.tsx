"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { fullNameSchema } from "../../../schemas/src/profile/profile-create-schema";
import { zodResolver } from "@hookform/resolvers/zod";

export type FullnameType = z.infer<typeof fullNameSchema>;

export const fullnameForm = () => {

    const form = useForm<FullnameType>({
        resolver: zodResolver(fullNameSchema),
    });

    return form;
};
