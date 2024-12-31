"use client"

import { useSessionContext } from "@instapark/auth"
import { User } from "lucide-react";
import { useEffect } from "react"
import { Icon } from "../components/icon";
import { Avatar, AvatarFallback, AvatarImage } from "../components/avatar"


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
            <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>
        )
    }

    return (
        <Icon>
            <User className="h-5 w-5 text-muted-foreground" />
        </Icon>
    )
}
