"use client"

import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '../components/avatar';
import { SwitchRoleButton } from "../components/switch-role-button";
import { HeaderNavigation } from "./header-navigation";
import { NotificationIcon } from '../components/notification-icon';
import { usePathname } from 'next/navigation';
import { hasPermission, HEADER_PROTECTED_ITEMS } from './header-constants';
import { useAuth } from '../hooks/use-auth';
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, navigationMenuTriggerStyle } from '../components/navigation-menu';

export const HeaderMain = () => {
    const { userId } = useAuth() ?? {};
    const pathname = usePathname();
    const hostingPage = pathname.includes("hosting");

    const permission = hasPermission({
        authed: !!userId,
        hostingPage,
    });

    return (
        <header className="fixed top-0 right-0 z-20 bg-background w-full mx-auto pborder-b">
            <div className="container flex justify-between py-4">
                <Link href="/" className="flex gap-4 items-center">
                    <Avatar>
                        <AvatarImage width={200} height={200} src="/instapark.svg" />
                        <AvatarFallback>P</AvatarFallback>
                    </Avatar>
                    <div className="hidden sm:flex text-lg font-semibold text-[#010080]">Instapark</div>
                </Link>
                <div className="flex gap-4 items-center">
                    {hostingPage ? (
                        < NavigationMenu >
                        <NavigationMenuList>
                            {
                                HEADER_PROTECTED_ITEMS.data.map((item, index) => item.items.map((item, index) => (
                                    <NavigationMenuItem key={index}>
                                        <Link href={item.link} legacyBehavior passHref>
                                            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                                {item.name}
                                            </NavigationMenuLink>
                                        </Link>
                                    </NavigationMenuItem>
                                )))
                            }
                        </NavigationMenuList>
                    </NavigationMenu>
                ) : permission ? (
                <NavigationMenu>
                    <NavigationMenuList>
                        {HEADER_PROTECTED_ITEMS.data.map((group, index) =>
                            group.items.map((item, idx) => (
                                <NavigationMenuItem key={`${index}-${idx}`}>
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
                    ) : null}
                <SwitchRoleButton variant="header" />
                <NotificationIcon userId={userId as string} />
                <HeaderNavigation hasPermission={permission} />
            </div>
        </div>
        </header >
    );
};
