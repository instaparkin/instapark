'use client'

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardFooter } from "../components/card";
import { Button } from "../components/button";
import { Heart, Star } from 'lucide-react';
import Link from "next/link";
import { useSearch } from '../hooks/use-search';
import { AppDispatch, RootState, searchListings, useDispatch, useSelector } from '@instapark/state';
import Image from "next/image"
import { ImageSwiper } from '../components/image-swiper';

interface ViewDetailsButtonProps {
  listingId: string
}

const ViewDetailsButton = ({ listingId }: ViewDetailsButtonProps) => {
  return (
    <Button variant="outline" asChild>
      <Link href={`/parkings/${listingId}`}>
        View Details
      </Link>
    </Button>
  )
}

export const HomeListingsResults = () => {
  const data = useSelector((state: RootState) => state.search.listingData);

  return (
    <main>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
        {data?.map((item) => (
          <Card key={item?.listingId} className="overflow-hidden">
            <div className="relative aspect-[4/3]">
              <ImageSwiper content={item.photos} />
              <Button
                variant="secondary"
                size="icon"
                className="absolute top-2 right-2 rounded-full z-10"
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
              <p className="text-sm mt-2">
                {item.allowedVehicles.join(", ")}
              </p>
            </CardContent>
            <CardFooter className="p-4 pt-0 flex justify-between items-center">
              <div>
                <span className="font-semibold">${item.basePrice.toFixed(2)}</span> / hour
              </div>
              <ViewDetailsButton listingId={item.listingId} />
            </CardFooter>
          </Card>
        ))}
      </div>
    </main>
  );
};
