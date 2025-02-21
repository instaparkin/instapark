"use client"

import React from "react";
import { useVendor } from "@instapark/ui";
import { redirect } from "next/navigation";

const ListingsAddLayout = ({ children }: { children: React.ReactNode }) => {

    const { isVendor } = useVendor({ vendorId: "123" })

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