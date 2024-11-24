"use client"

import React from 'react'
import { Icon } from './icon'
import { ChevronLeft } from 'lucide-react'
import { usePathname, useRouter } from "next/navigation";

interface PageProps {
    children: React.ReactNode
    title: string
}

export const Page = ({ children, title }: PageProps) => {
    const router = useRouter();
    const pathname = usePathname().split("/");
    return (
        <div className='space-y-6 mb-6'>
            {
                pathname.length > 0 && (
            <Icon>
                <ChevronLeft className="h-5 w-5" />
            </Icon>
                )
            }
            <h1 className='font-bold text-2xl mb-4'>{title}</h1>
            {children}
        </div>
    )
}
