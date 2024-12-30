"use client"

import { useSessionContext } from "@instapark/auth"
import { User } from "lucide-react";
import { useEffect } from "react"

export const UserButton = () => {
    const session = useSessionContext();

    if (session.loading) {
        return null;
    }

    useEffect(() => {
        const fetchSomething = async () => {
            try {
            } catch (error) {
                console.error(error)
            }
        }
        fetchSomething();
    }, [])

    if (session.userId) {
        return (
            <div>
                
            </div>
        )
    }

    return (
        <User />
    )
}
