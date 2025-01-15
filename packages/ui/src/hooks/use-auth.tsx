"use client"

import { useSessionContext } from "supertokens-auth-react/recipe/session";

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
