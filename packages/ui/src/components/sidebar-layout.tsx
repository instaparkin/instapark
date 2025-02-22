"use client"

import { usePathname } from "next/navigation"
import React from "react"
import { cn } from "../utils/cn"
import Link from "next/link"
import { Button, buttonVariants } from "./button"

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
    items: {
        href: string
        title: string
    }[]
}

interface SideBarLayoutProps {
    children: React.ReactNode
    sidebarNavItems: SidebarNavProps["items"]
}

export function SidebarNav({ className, items, ...props }: SidebarNavProps) {
    const pathname = usePathname()

    return (
        <nav
            className={cn(
                "flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1",
                className
            )}
            {...props}
        >
            {items.map((item) => (
                <Button
                    key={item.href}
                    asChild
                    className={"justify-start"}
                    variant={"ghost"}>
                    <Link
                        href={item.href}
                    >
                        {item.title}
                    </Link>
                </Button>
            ))}
        </nav>
    )
}

export function SideBarLayout({ children, sidebarNavItems }: SideBarLayoutProps) {
    return (
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
            <aside className="-mx-4 lg:w-1/5 text-muted-foreground">
                <SidebarNav items={sidebarNavItems} />
            </aside>
            <div className="max-w-2xl">{children}</div>
        </div >
    )
}
