"use client"

import React from "react"
import { cn } from "../utils/cn"
import Link from "next/link"
import { Button } from "./button"
import { usePathname } from "next/navigation"

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
    const pathname = usePathname();
    console.log(pathname);

    return (
        <nav
            className={cn("flex flex-row overflow-x-auto lg:flex-col lg:space-y-1 border rounded-lg p-1 lg:p-2", className)}
            {...props}
        >
            {items.map((item) => (
                <Button
                    key={item.href}
                    asChild
                    className={cn(
                        "justify-start whitespace-nowrap",
                        pathname === item.href ? "bg-secondary hover:bg-secondary" : "hover:bg-secondary/50",
                    )}
                    variant="ghost"
                >
                    <Link href={item.href}>{item.title}</Link>
                </Button>
            ))}
        </nav>
    )
}

export function SideBarLayout({ children, sidebarNavItems }: SideBarLayoutProps) {
    return (
        <div className="container mx-auto p-4">
            <div className="flex flex-col gap-4 lg:flex-row lg:gap-8">
                <aside className="w-full lg:w-64 shrink-0">
                    <SidebarNav items={sidebarNavItems} />
                </aside>
                <main className="flex-1 min-w-0">
                    <div className="w-full rounded-lg border p-4">{children}</div>
                </main>
            </div>
        </div>
    )
}
