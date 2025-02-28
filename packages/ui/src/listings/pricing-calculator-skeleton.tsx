"use client"

import React from "react"
import { Card, CardContent } from "../components/card"
import { cn } from "../utils/cn"
import { Skeleton } from "../components/skeleton"
import { Label } from "../components/label"
import { DetailsSkeleton } from "../components/details"

interface PricingCalculatorSkeletonProps {
  className?: string
}

export function PricingCalculatorSkeleton({ className }: PricingCalculatorSkeletonProps) {
  return (
    <Card className={cn("w-full rounded-none md:rounded-lg", className)}>
      <CardContent className="p-6">
        <div className="space-y-4 animate-pulse">
          {/* Price Display Skeleton */}
          <div className="flex flex-col sm:flex-row gap-4 justify-between">
            <div className="flex items-baseline gap-2">
              <Skeleton className="h-8 w-24" />
              <Skeleton className="h-5 w-12" />
            </div>
            <Skeleton className="h-10 w-full sm:w-24" />
          </div>

          {/* Vehicle Selection Skeleton */}
          <div className="space-y-2">
            <Label className="text-muted-foreground/70">Vehicle Type</Label>
            <Skeleton className="h-10 w-full" />
          </div>

          {/* Start Date and Time Skeleton */}
          <div className="space-y-2">
            <Label className="text-muted-foreground/70">Start Date and Time</Label>
            <Skeleton className="h-10 w-full" />
          </div>

          {/* End Date and Time Skeleton */}
          <div className="space-y-2">
            <Label className="text-muted-foreground/70">End Date and Time</Label>
            <Skeleton className="h-10 w-full" />
          </div>

          {/* Price Breakdown Skeleton */}
          <DetailsSkeleton items={4} />
        </div>
      </CardContent>
    </Card>
  )
}

