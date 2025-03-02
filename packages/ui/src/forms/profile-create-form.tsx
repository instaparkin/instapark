"use client"

import React from "react";
import { useQuery } from "@apollo/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { profileSchema, z } from "@instapark/schemas";
import { useForm } from "react-hook-form";
import { GET_PROFILE } from "../graphql/get-profile";
import { useAuth } from "../hooks/use-auth";
import { Profile } from "../__generated__/graphql";

export type ProfileFormType = z.infer<typeof profileSchema>

export const ProfileForm = () => {
    const { userId } = useAuth();
    const { data } = useQuery(GET_PROFILE, {
        variables: {
            userId
        }
    });
    const profile = data?.UserQuery?.getProfile as Profile

    const form = useForm<ProfileFormType>({
        resolver: zodResolver(profileSchema),
    })
    React.useEffect(() => {
        if (data?.UserQuery?.getProfile) {
            const profile = data.UserQuery.getProfile as Profile;

            // Remove null or empty values dynamically
            const updatedValues = Object.fromEntries(
                Object.entries(profile).filter(([_, value]) => value !== null && value !== "")
            );

            if (Object.keys(updatedValues).length > 0) {
                form.reset(updatedValues);
            }
        }
    }, [data]);

    return {
        form,
        verified: profile?.kyc?.verified as boolean
    }
}
