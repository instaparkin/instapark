'use client'


import React from 'react';
import { Card, CardContent, CardFooter } from "../components/card";
import { Button } from "../components/button";
import { Heart } from 'lucide-react';
import Link from "next/link";
import { RootState, useSelector } from '@instapark/state';
import { ImageSwiper } from '../components/image-swiper';
import { ListingCard } from '../components/listing-card';

export const HomeListingsResults = () => {

  const data = useSelector((state: RootState) => state.search.listingData);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
      {data?.map((item, index) => (
        <ListingCard key={index} listing={item} />
      ))}
    </div>
  );
};
