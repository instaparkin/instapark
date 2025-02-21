"use client"

import React from "react"
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '../components/avatar';
import { SwitchRoleButton } from "../components/switch-role-button";
import { usePathname } from 'next/navigation';
import { useAuth } from '../hooks/use-auth';
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, navigationMenuTriggerStyle } from '../components/navigation-menu';
import { UserButton } from "../auth/user-button";
import { HEADER_NAVIGATION_ITEMS } from "./header-constants"

export const HeaderMain = () => {
    const { firstName, userId } = useAuth();
    const pathname = usePathname();
    const isHostingPage = pathname.includes("hosting");
    const navigationItems = isHostingPage ? HEADER_NAVIGATION_ITEMS.HOSTING : HEADER_NAVIGATION_ITEMS.BUYER

    return (
        <header className="fixed top-0 right-0 z-20 bg-background w-full border-b">
            <div className="container flex justify-between py-4">
                <Link href="/" className="flex gap-4 items-center">
                    <Avatar>
                        <AvatarImage width={200} height={200} src="/instapark.svg" />
                        <AvatarFallback>P</AvatarFallback>
                    </Avatar>
                    <div className="hidden sm:flex text-lg font-semibold text-[#010080] dark:text-white">Instapark</div>
                </Link>
                <NavigationMenu>
                    <NavigationMenuList className="hidden lg:flex space-x-3">
                        {navigationItems.flatMap((group) =>
                            group.items.map((item, index) => (
                                <NavigationMenuItem key={index}>
                                    <Link href={item.link} legacyBehavior passHref>
                                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                            {item.name}
                                        </NavigationMenuLink>
                                    </Link>
                                </NavigationMenuItem>
                            ))
                        )}
                    </NavigationMenuList>
                </NavigationMenu>
                <div className="flex gap-4 items-center">
                    <SwitchRoleButton variant="header" />
                    <UserButton
                        first_name={firstName}
                        userId={userId}
                        navigationItems={navigationItems} />
                </div>
            </div>
        </header >
    );
};
