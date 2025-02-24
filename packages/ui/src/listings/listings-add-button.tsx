"use client"

import React from 'react'
import { Button } from '../components/button'
import toast from 'react-hot-toast'
import Link from 'next/link'
import { useVendor } from '../hooks/use-vendor'

interface ListingsAddButtonProps {
    userId: string
}

export const ListingsAddButton = ({ userId }: ListingsAddButtonProps) => {
    const { isVendor } = useVendor({ userId })

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
            onClick={() => toast.error("Add the Payment Details first")}>
            Create Listing
        </Button>
    )
}
