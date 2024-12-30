"use client"

import { SuperTokensProvider } from "@instapark/auth";
import { StoreProvider } from "@instapark/state";
import { HeaderSkeleton } from "@instapark/ui";
import dynamic from "next/dynamic";

const HeaderMainDynamic = dynamic(() =>
    import("@instapark/ui").then(mod => mod.HeaderMain), {
    loading: () => <HeaderSkeleton />
})

const PublicLayout = ({ children }: { children: React.ReactNode }): JSX.Element => {
    return (
        <SuperTokensProvider>
            <StoreProvider>
                <HeaderMainDynamic />
                {children}
            </StoreProvider>
        </SuperTokensProvider>
    );
}

export default PublicLayout