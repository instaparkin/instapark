import React from 'react'
import { Page } from '../components/page'
import { HOSTING_NAVIGATION_ITEMS } from './hosting-constants'
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from "../components/navigation-menu"
import Link from 'next/link'
import { cn } from '../utils/cn'

export const HostingMain = () => {
    return (
        <Page title='Hosting'>
            <NavigationMenu>
                <NavigationMenuList className='flex gap-2'>
                    {
                        HOSTING_NAVIGATION_ITEMS.map((hosting) => {
                            return (
                                <NavigationMenuItem key={hosting.value}>
                                    <Link href={hosting.link} legacyBehavior passHref>
                                        <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), "border border-foreground")}>
                                            {hosting.value}
                                        </NavigationMenuLink>
                                    </Link>
                                </NavigationMenuItem>
                            )
                        })
                    }
                </NavigationMenuList>
            </NavigationMenu>
        </Page>
    )
}
