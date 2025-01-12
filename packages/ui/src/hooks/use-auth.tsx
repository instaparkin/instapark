"use client"

import { useSessionContext } from '@instapark/auth'

export const useAuth = () => {

    const session = useSessionContext();

    if (session.loading) {
        return {
            userId: ""
        };
    }

    return {
        userId: session.userId
    }
}
