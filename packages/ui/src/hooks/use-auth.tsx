"use client"

import axios from "axios";
import { useEffect, useState } from "react";
import { ApiResponse, AuthMetadata, AuthMetadataRequest } from "@instapark/types"
import toast from "react-hot-toast";

interface UseAuthType extends AuthMetadata {
    setMetadata: (key: keyof AuthMetadataRequest, value: string) => void
}

export const useAuth = (): UseAuthType => {

    const [info, setInfo] = useState<AuthMetadata>({
        userId: "",
        first_name: "",
        last_name: "",
        preferred_first_name: "",
        emails: [],
        phoneNumbers: [],
        timeJoined: 0
    });

    useEffect(() => {
        const fetchMetadata = async () => {
            try {
                const response = await axios.get<ApiResponse<AuthMetadata>>(
                    "http://localhost:8081/auth/metadata/"
                );
                if (response.data.data) {
                    setInfo(response.data.data);
                } else {
                    toast.error(response.data.message);
                }
            } catch (error) {
                toast.error("An error occurred while fetching metadata: " + error);
            }
        };

        fetchMetadata();
    }, []);

    const setMetadata = async (key: keyof AuthMetadata, value: string) => {
        try {
            const response = await axios.post<ApiResponse<AuthMetadata>>(
                "http://localhost:8081/auth/metadata/",
                { [key]: value }
            );
            if (response.data.data) {
                toast.success(response.data.message);
            } else {
                toast.error(response.data.message || "Failed to update metadata");
            }
        } catch (error) {
            toast.error("Error Occurred: " + error);
        }
    };

    return {
        ...info,
        setMetadata
    }
}
