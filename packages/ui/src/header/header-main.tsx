'use client';

import React from 'react';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '../components/avatar';
import { SwitchRoleButton } from '../components/switch-role-button';
import { usePathname } from 'next/navigation';
import { useAuth } from '../hooks/use-auth';
import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	navigationMenuTriggerStyle,
} from '../components/navigation-menu';
import { UserButton } from '../auth/user-button';
import { HEADER_NAVIGATION_ITEMS } from './header-constants';

export const HeaderMain = () => {
	const { firstName, userId } = useAuth()!;
	const pathname = usePathname();
	const isHostingPage = pathname.includes('hosting');
	const navigationItems = isHostingPage
		? HEADER_NAVIGATION_ITEMS.HOSTING
		: HEADER_NAVIGATION_ITEMS.BUYER;

	return (
		<header className="bg-background fixed right-0 top-0 z-20 w-full border-b">
			<div className="container flex justify-between py-4">
				<Link href="/" className="flex items-center gap-4">
					<Avatar>
						<AvatarImage width={200} height={200} src="/instapark.svg" />
						<AvatarFallback>P</AvatarFallback>
					</Avatar>
					<div className="text-instapark hidden text-lg font-semibold sm:flex dark:text-white">
						Instapark
					</div>
				</Link>
				<NavigationMenu>
					<NavigationMenuList className="hidden space-x-3 lg:flex">
						{navigationItems.flatMap((group) =>
							group.items.map((item, index) => (
								<NavigationMenuItem
									className="text-muted-foreground"
									key={index}
								>
									<Link href={item.link} legacyBehavior passHref>
										<NavigationMenuLink
											className={navigationMenuTriggerStyle()}
										>
											{item.name}
										</NavigationMenuLink>
									</Link>
								</NavigationMenuItem>
							)),
						)}
					</NavigationMenuList>
				</NavigationMenu>
				<div className="flex items-center gap-4">
					<SwitchRoleButton variant="header" />
					<UserButton
						first_name={firstName}
						userId={userId}
						navigationItems={navigationItems}
					/>
				</div>
			</div>
		</header>
	);
};
