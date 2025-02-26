"use client"

import React from "react";
import { useVendor } from "@instapark/ui";
import { redirect } from "next/navigation";
import { useAuth } from "@instapark/ui/src/hooks/use-auth";
import { uuidToAlphanumeric } from "@instapark/ui/src/earnings/earnings-main";

const ListingsAddLayout = ({ children }: { children: React.ReactNode }) => {
    const { userId } = useAuth();
    const { isVendor } = useVendor({ userId: uuidToAlphanumeric(userId) })

    if (isVendor) {
        return (
            <div>
                {children}
            </div>
        )
    }

    redirect("/hosting/listings")
}
export default ListingsAddLayout