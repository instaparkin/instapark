'use client'

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import Image from 'next/image';

import 'swiper/css';
import 'swiper/css/pagination';

interface ListingsImageSwiperProps {
    content: string[]
}

export const ListingsImageSwiper: React.FC<ListingsImageSwiperProps> = ({ content }) => {
    return (
        <Swiper
            pagination={{
                dynamicBullets: true,
                hideOnClick: true,
                clickable: true
            }}
            modules={[Pagination]}
            className="w-full h-full"
        >
            {content.map((imageUrl, index) => (
                <SwiperSlide key={index}>
                    <div className="relative w-full h-full">
                        <Image
                            src={imageUrl}
                            alt={`Parking space image ${index + 1}`}
                            fill
                            className="object-cover"
                        />
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    )
}