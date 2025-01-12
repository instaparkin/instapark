'use client'

import React from 'react';
import { Card, CardContent, CardFooter } from "../components/card";
import { Button } from "../components/button";
import { Heart, Star } from 'lucide-react';
import Link from "next/link";
import { useSessionContext } from '@instapark/auth';
import { RootState, useSelector } from '@instapark/state';

export const ListingsDetails = () => {
  const session = useSessionContext();

  if (session.loading) {
    return null
  }

  const data = useSelector((state: RootState) => state.search.listingData)

  return (
    <main>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((item) => (
          <Card key={item.listingId} className="overflow-hidden">
            <Link href={`/parkings/${item.listingId}`}>
              <div className="relative aspect-video">
                <Button
                  variant="secondary"
                  size="icon"
                  className="absolute top-2 right-2 rounded-full"
                >
                  <Heart className="h-4 w-4" />
                  <span className="sr-only">Save to wishlist</span>
                </Button>
              </div>
              <CardContent className="p-4">
                <h2 className="font-semibold text-lg mb-1">
                  {item.city}, {item.state}
                </h2>
                <p className="text-muted-foreground text-sm mb-2">
                  {item.city}, {item.state}
                </p>
                <div className="flex items-center gap-1 text-sm">
                  <Star className="h-4 w-4 fill-primary text-primary" />
                  <span>Status: {item.isOpen ? "Open" : "Closed"}</span>
                </div>
                <p className="text-sm mt-2">
                  {item.allowedVehicles.join(", ")}
                </p>
              </CardContent>
              <CardFooter className="p-4 pt-0 flex justify-between items-center">
                <div>
                  <span className="font-semibold">${item.basePrice.toFixed(2)}</span> / hour
                </div>
                <Button variant="default">
                  View Details
                </Button>
              </CardFooter>
            </Link>
          </Card>
        ))}
      </div>
    </main>
  );
};
