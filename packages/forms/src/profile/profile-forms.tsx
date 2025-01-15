"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { fullNameSchema } from "./profile-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { axios, logger } from "@instapark/utils";

export type FullnameType = z.infer<typeof fullNameSchema>;

export const fullnameForm = () => {
    const [fullname, setFullname] = useState<FullnameType>({
        userId: "",
        firstname: "",
        lastname: ""
    });

    const form = useForm<FullnameType>({
        resolver: zodResolver(fullNameSchema),
        defaultValues: {
            ...fullname,
        },
    });

    return form;
};
