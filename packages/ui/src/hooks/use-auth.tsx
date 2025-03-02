"use client"

import { useQuery } from "@apollo/client";
import { GET_PROFILE } from "../graphql/get-profile";
import { Profile } from "../__generated__/graphql";
import { useSessionContext } from "supertokens-auth-react/recipe/session";

export const useAuth = (): Profile => {
    const session = useSessionContext();

    if (session.loading || !session.doesSessionExist) {
        return {} as Profile
    }

    const { data } = useQuery(GET_PROFILE, {
        variables: {
            userId: session.userId
        },
    });

    return {
        ...data?.UserQuery?.getProfile as Profile,
        userId: session.userId,
    }
}
