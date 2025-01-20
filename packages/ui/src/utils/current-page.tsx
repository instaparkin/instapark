"use client"

import { usePathname } from "next/navigation"

function capitalizeFirstLetter(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export const useCurrentPage = () => {

    const pathname = usePathname();

    const isHomePage = pathname === "/"

    if (isHomePage) {
        return
    }

    const currentPage = pathname.split("/").filter((segment) => segment !== "")[0] as string;

    return capitalizeFirstLetter(currentPage)
}