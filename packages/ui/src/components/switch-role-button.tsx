"use client"

import React from 'react';
import { Button } from './button';
import { cn } from '../utils/cn';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export function SwitchRoleButton({ className }: { className?: string }) {

    const pathname = usePathname()

    return (
        <Button
            asChild
            className={cn(className, "w-full hidden md:flex")}
            variant={"outline"}>
            <Link href={pathname.includes("hosting") ? "/" : "/hosting"}>
                Switch to  {pathname.includes("hosting") ? "Buyer" : "Hosting"}
            </Link>
        </Button>
    );
}
