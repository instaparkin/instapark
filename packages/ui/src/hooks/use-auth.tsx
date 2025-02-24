"use client"

import React from "react";
import { ApiResponse, Profile } from "@instapark/types"
import { useQuery } from "@apollo/client";
import { GET_PROFILE } from "../graphql/get-profile";
import axios from "axios";

export const useAuth = (): Profile => {
    const [userId, setUserId] = React.useState("");

    React.useEffect(() => {
        axios.get<ApiResponse<{ userId: string }>>
            ("http://localhost:8081/verify")
            .then(response => {
                if (response.status === 401) {
                    setUserId("")
                }
                setUserId(response.data.data?.userId as string)
            })
    }, [])
    console.log(userId);

    const { data } = useQuery(GET_PROFILE, {
        variables: {
            userId: userId,
        },
        skip: !userId
    });

    return {
        ...data?.UserQuery?.getProfile,
    }
}
