"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { fullNameSchema } from "./profile-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSessionContext } from "@instapark/auth";
import { useEffect, useState } from "react";
import { axios, logger } from "@instapark/utils";

export type FullnameType = z.infer<typeof fullNameSchema>;

export const fullnameForm = () => {
    const [fullname, setFullname] = useState<FullnameType>({
        userId: "",
        firstname: "",
        lastname: ""
    });

    const session = useSessionContext();
    
    if (session.loading) {
        return null;
    }

    const userId = session.userId;

    useEffect(() => {
        if (userId) {
            axios.get(`http://localhost:8088/profile/fullname/get/${userId}`)
                .then(res => {
                    setFullname(res.data);
                })
                .catch((error) => {
                    logger.error(error);
                });
        }
    }, [userId]);

    const form = useForm<FullnameType>({
        resolver: zodResolver(fullNameSchema),
        defaultValues: {
            ...fullname,
            userId
        },
    });

    return form;
};
