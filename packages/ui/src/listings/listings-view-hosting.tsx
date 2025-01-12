'use client'

import React, { ReactNode, useState, useTransition } from "react"
import { Listing } from "@instapark/types"
import { Card, CardContent, CardFooter } from "../components/card"
import { ListingsImageSwiper } from "./listings-image-swiper"
import { Button } from "../components/button"
import { BikeIcon, Car } from 'lucide-react'
import Link from "next/link"
import { ListingsWishlist } from "./listings-wishlist"
import { MdCyclone } from "react-icons/md"
import { Badge } from "../components/badge"
import { ListingsViewToggle } from "./listings-view-toggle"
import { DataTable } from "../components/data-table"
import { columns } from "./listings-hosting-columns"

interface ListingsViewProps {
  data: Listing[]
  title?: string
}

export function ListingsView({ data, title = "Listings" }: ListingsViewProps) {
  const [isPending, startTransition] = useTransition()
  const [view, setView] = useState<"Grid" | "List">("Grid")

  const handleViewChange = (newView: "Grid" | "List") => {
    startTransition(() => {
      setView(newView)
    })
  }

  const vehicleIcons: Record<
    string,
    ReactNode
  > = {
    Car: <Car className="w-5 h-5" />,
    Bike: <BikeIcon className="w-5 h-5" />,
    Cycle: <MdCyclone className="w-5 h-5" />,
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">{title}</h1>
        <ListingsViewToggle view={view} onViewChange={handleViewChange} />
      </div>

      <div className={`transition-all duration-300 ${isPending ? 'opacity-50' : 'opacity-100'}`}>
        {view === "Grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-in fade-in-0 duration-500">
            {data?.map((item) => (
              <Card key={item?.listingId} className="overflow-hidden">
                <div className="relative aspect-[4/3]">
                  <ListingsImageSwiper content={item.photos} />
                  <Button
                    variant="secondary"
                    size="icon"
                    className="absolute top-2 right-2 rounded-full"
                  >
                    <ListingsWishlist listingId={item.listingId} />
                  </Button>
                </div>
                <CardContent className="p-4">
                  <h2 className="font-semibold text-lg mb-1">
                    {item.city}, {item.state}
                  </h2>
                  <p className="text-muted-foreground text-sm mb-2">
                    {item.city}, {item.state}
                  </p>
                  <p className="text-sm mt-2 flex gap-2">
                    {item.allowedVehicles.map((v) => {
                      const Icon = vehicleIcons[v]
                      return (
                        <Badge variant={"outline"} key={v} className="rounded-sm p-2 flex items-center gap-2">
                          {Icon}
                          {v}
                        </Badge>
                      )
                    })}
                  </p>
                </CardContent>
                <CardFooter className="p-4 pt-0 flex justify-between items-center">
                  <div>
                    <span className="font-semibold">${item.basePrice.toFixed(2)}</span> / hour
                  </div>
                  <Button variant="outline" asChild>
                    <Link href={`/parkings/${item.listingId}`}>View Details</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <DataTable data={data} columns={columns} />
        )}
      </div>
    </div>
  )
}

