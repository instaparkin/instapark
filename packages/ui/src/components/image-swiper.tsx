'use client'

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import Image from 'next/image';

import 'swiper/css';
import 'swiper/css/pagination';

interface SwiperMainProps {
  content: string[]
}

export function ImageSwiper({ content }: SwiperMainProps) {
  return (
    <Swiper
      pagination={{
        dynamicBullets: true,
        hideOnClick: true,
        clickable : true
      }}
      modules={[Pagination]}
      className="w-full h-full"
    >
      {content.map((photo, index) => (
        <SwiperSlide key={index}>
          <div className="relative w-full h-full">
            <Image
              src={photo}
              alt={`Parking space image ${index + 1}`}
              fill
              className="object-cover"
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

