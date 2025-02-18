"use client"

import React from "react"
import { cn } from "../utils/cn"
import { usePathname } from "next/navigation"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "./breadcrumb"

interface PageProps {
    children: React.ReactNode
    title?: string
    className?: string
}

function capitalizeFirstLetter(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
export const Page: React.FC<PageProps> = ({ children, title, className }) => {

    return (
        <main className={cn("relative top-28 w-full mx-auto space-y-6 pb-12", className)}>
            <div className="container space-y-6">
                <PageBreadCrumbs />
                {title && <div className="font-semibold text-lg md:text-xl lg:text-2xl">{title}</div>}
                {children}
            </div>
        </main>
    )
}

export function PageBreadCrumbs() {
    const pathname = usePathname()
    const pathSegments = pathname.split("/").filter((segment) => segment !== "")

    return pathSegments.length > 1 && (
        <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbItem>
                    {
                        pathname != "/" && <BreadcrumbLink href="/">Home</BreadcrumbLink>
                    }

                </BreadcrumbItem>
                {pathSegments.map((segment, index) => {
                    const href = `/${pathSegments.slice(0, index + 1).join("/")}`
                    const isLast = index === pathSegments.length - 1
                    return (
                        <React.Fragment key={href}>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                {isLast ? (
                                    <BreadcrumbPage>{capitalizeFirstLetter(segment)}</BreadcrumbPage>
                                ) : (
                                    <BreadcrumbLink href={href}>{capitalizeFirstLetter(segment)}</BreadcrumbLink>
                                )}
                            </BreadcrumbItem>
                        </React.Fragment>
                    )
                })}
            </BreadcrumbList>
        </Breadcrumb>
    )
}

