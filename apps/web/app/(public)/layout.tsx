"use client"

import { AuthProvider, HeaderSkeleton, StoreProvider } from "@instapark/ui";
import dynamic from "next/dynamic";

const HeaderMainDynamic = dynamic(() =>
    import("@instapark/ui").then(mod => mod.HeaderMain), {
    loading: () => <HeaderSkeleton />
})

const PublicLayout = ({ children }: { children: React.ReactNode }): JSX.Element => {
    return (
        <StoreProvider>
            <AuthProvider>
                <HeaderMainDynamic />
                {children}
            </AuthProvider>
        </StoreProvider>
    );
}

export default PublicLayout