'use client'

import React, { ReactNode, useState, useTransition } from "react"
import { Listing } from "@instapark/types"
import { Card, CardContent, CardFooter } from "../components/card"
import { Button } from "../components/button"
import { BikeIcon, Car } from 'lucide-react'
import Link from "next/link"
import { MdCyclone } from "react-icons/md"
import { Badge } from "../components/badge"
import { ListingsViewToggle } from "./listings-view-toggle"
import { DataTable } from "../components/data-table"
import { columns } from "./listings-hosting-columns"
import { ListingWishlist } from "../components/listing-wishlist"
import { ImageSwiper } from "../components/image-swiper"
import { ListingCard } from "../components/listing-card"

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
              <ListingCard listing={item} />
            ))}
          </div>
        ) : (
          <DataTable data={data} columns={columns} />
        )}
      </div>
    </div>
  )
}

