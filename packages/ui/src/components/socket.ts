"use client"

import { io } from "socket.io-client";
import { getAccessToken } from "@instapark/auth";
import { useEffect, useState } from "react";

export const useSocket = () => {
    const [token, setToken] = useState<string>();

    useEffect(() => {
        async function initWebSocketAuth() {
            try {
                const token = await getAccessToken();
                setToken(token);
                if (!token) throw new Error("User is not logged in");
            } catch (err) {
                console.error(err);
            }
        }
        initWebSocketAuth();
    }, [token]);

    const socket = io("http://localhost:8084", {
        query: { token },
        autoConnect: false,
        tryAllTransports: true
    })
    socket.connect();

    console.log(socket.connected);

    return { socket };
}
