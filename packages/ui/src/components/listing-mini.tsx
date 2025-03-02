import React from "react";
import Image from "next/image"
import { formatLocation } from "../utils/field-name";
import { Listing } from "../__generated__/graphql";

export const ListingMini = ({ listing }: { listing: Listing }) => {
    return (
        <div className="flex gap-4 items-center">
            <div className="relative w-20 h-20 flex-shrink-0 sm:w-24 sm:h-24">
                <Image
                    fill
                    src={(listing.photos[0] as string) || "/placeholder.svg"}
                    alt={`Listing Photo`}
                    className="object-cover rounded-lg border"
                />
            </div>
            <div className="flex-1 min-w-0">
                <div className="mt-1 line-clamp-2">
                    {formatLocation(
                        listing.country,
                        listing.state,
                        listing.district,
                        listing.city,
                        listing.street,
                        listing.pincode,
                    )}
                </div>
            </div>
        </div>
    )
}

