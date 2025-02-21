"use client"

import React from 'react'
import { Button } from '../components/button'
import toast from 'react-hot-toast'
import Link from 'next/link'
import { useVendor } from '../hooks/use-vendor'

export const ListingsAddButton = () => {
    const { isVendor } = useVendor({ vendorId: "123" })

    if (isVendor) {
        return (
            <Button variant={"outline"} asChild>
                <Link href={`/hosting/listings/add`}>
                    Create Listing
                </Link>
            </Button>
        )
    }

    return (
        <Button
            variant={"outline"}
            onClick={() => toast.error("Complete the payment steps first")}>
            Create Listing
        </Button>
    )
}
