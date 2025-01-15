"use client";

import { AuthProvider } from "@instapark/ui";

const PublicLayout = ({ children }: { children: React.ReactNode }): JSX.Element => {
    return (
        <AuthProvider>
            {children}
        </AuthProvider>
    );
}

export default PublicLayout