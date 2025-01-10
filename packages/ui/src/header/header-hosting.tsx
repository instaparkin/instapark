import Link from "next/link"
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
    NavigationMenuViewport,
} from "../components/navigation-menu"
import { HEADER_PROTECTED_ITEMS } from "./header-constants"
import { Avatar, AvatarFallback, AvatarImage } from "../components/avatar"
import { BRAND_LOGO, BRAND_NAME } from "../brand/brand-constants"
import { NotificationIcon } from "../components/notification-icon"
import { HeaderNavigation } from "./header-navigation"
import { SwitchRoleButton } from "../components/switch-role-button"
import { useSessionContext } from "@instapark/auth"


export const HeaderHosting = () => {

    const session = useSessionContext();
    if(session.loading){
        return null
    }
    return (
        <header className="fixed top-0 right-0 z-20 bg-background w-full mx-auto border-b">
            <div className='container flex justify-between py-4'>
                <Link href="/" className='flex gap-4 items-center'>
                    <Avatar>
                        <AvatarImage width={200} height={200} src={BRAND_LOGO} />
                        <AvatarFallback>{BRAND_NAME[0]}</AvatarFallback>
                    </Avatar>
                    <div className='hidden sm:flex text-lg font-semibold text-[#010080]'>
                        {BRAND_NAME}
                    </div>
                </Link>
                <NavigationMenu>
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
                <div className='flex gap-4 items-center'>
                    <NotificationIcon userId={session?.userId} />
                    <HeaderNavigation />
                </div>
            </div>
        </header>
    )
}
