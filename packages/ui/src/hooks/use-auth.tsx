"use client"

import axios from "axios";
import { useEffect, useState } from "react";
import { useSessionContext } from "supertokens-auth-react/recipe/session";
import { ApiResponse } from "@instapark/types"
import toast from "react-hot-toast";

type Username = {
    first_name: string
    last_name: string
    full_name: string
}

export const useAuth = () => {

    const session = useSessionContext();

    const [username, setUsername] = useState<Username | undefined>();

    useEffect(() => {
        axios.get<ApiResponse<Username>>("http://localhost:8080/auth/username/get")
            .then(res => {
                setUsername(res?.data?.data)
            })
            .catch((error) => {
                toast.error(error);
            })
    }, [])

    if (session.loading) {
        return {
            userId: "",
            first_name: "",
            last_name: "",
            full_name: ""
        };
    }

    return {
        session,
        userId: session.userId,
        first_name: username?.first_name || "",
        last_name : username?.last_name || "",
        full_name : username?.full_name || ""
    }
}
