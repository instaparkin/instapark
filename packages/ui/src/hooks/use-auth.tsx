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
                setUserId(response.data.data?.userId as string)
            })
            .catch(error => {
                if (error.response.status === 401) {
                    setUserId("")
                }
            })
    }, [])

    const { data } = useQuery(GET_PROFILE, {
        variables: {
            userId: userId
        }
    });

    console.log(data);
    

    return {
        ...data?.UserQuery?.getProfile as Profile,
    }
}
