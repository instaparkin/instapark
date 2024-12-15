import React from 'react'
import { Page } from '../components/page'
import { HOSTING_NAVIGATION_ITEMS } from './hosting-constants'
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
} from "../components/navigation-menu"

export const HostingMain = () => {
    return (
        <Page title='Hosting'>
            <NavigationMenu>
                <NavigationMenuList>
                    {
                        HOSTING_NAVIGATION_ITEMS.map((hosting) => {
                            return (
                                <NavigationMenuItem key={hosting.value}>
                                        <NavigationMenuLink href={hosting.link}>
                                            {hosting.value}
                                        </NavigationMenuLink>
                                </NavigationMenuItem>
                            )
                        })
                    }
                </NavigationMenuList>
            </NavigationMenu>
        </Page>
    )
}
