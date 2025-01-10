"use client"

import { useSessionContext } from '@instapark/auth'

export const useAuth = () => {

    const session = useSessionContext();

    if (session.loading) {
        return null;
    }

    const userId = session.userId;

    return {
        userId
    }
}
