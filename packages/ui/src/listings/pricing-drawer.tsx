'use client'

import * as React from "react"
import { ChevronUp } from 'lucide-react'
import { PricingCalculator } from "./pricing-calculator"
import { Drawer, DrawerContent, DrawerTrigger } from "../components/drawer"
import { Button } from "../components/button"
import { cn } from "../utils/cn"

interface PricingDrawerProps {
  basePrice: number
  discountedPrice: number
  startDate: string
  endDate: string
  pphbi: number
  pphcy: number
  pphcr: number
  plph: number
}

export function PricingDrawer({
  basePrice,
  discountedPrice,
  startDate,
  endDate,
  pphbi,
  pphcy,
  pphcr,
  plph
}: PricingDrawerProps) {
  const [open, setOpen] = React.useState(false)

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg md:hidden">
          <div className="flex items-center justify-between p-4">
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-lg line-through text-muted-foreground">₹{basePrice}</span>
                <span className="text-2xl font-bold">₹{discountedPrice}</span>
              </div>
              <span className="text-sm text-muted-foreground">
                {startDate}-{endDate}
              </span>
            </div>
            <Button
              size="lg"
              className="bg-pink-600 hover:bg-pink-700 text-white min-w-[120px]"
              onClick={() => setOpen(true)}
            >
              Reserve
            </Button>
          </div>
          <div
            className={cn(
              "flex items-center justify-center py-2 border-t",
              open && "hidden"
            )}
          >
            <ChevronUp className="h-5 w-5 text-muted-foreground" />
          </div>
        </div>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-lg">
          <div className="p-4">
            <PricingCalculator
              pphbi={pphbi}
              pphcy={pphcy}
              pphcr={pphcr}
              plph={plph}
              basePrice={basePrice}
              instaparkFeePercentage={0} />
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  )
}

