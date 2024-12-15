"use client";

import { SuperTokensProvider } from "@instapark/auth";

const PublicLayout = ({ children }: { children: React.ReactNode }): JSX.Element => {
    return (
        <SuperTokensProvider>
            {children}
        </SuperTokensProvider>
    );
}

export default PublicLayout