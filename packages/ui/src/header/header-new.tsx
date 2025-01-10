import Link from 'next/link'
import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '../components/avatar'
import { BRAND_LOGO, BRAND_NAME } from '../brand/brand-constants'
import { SwitchRoleButton } from '../components/switch-role-button'
import { NotificationIcon } from '../components/notification-icon'
import { HeaderNavigation } from './header-navigation'
import { useSessionContext } from '@instapark/auth'
import { usePathname } from 'next/navigation'
import { hasPermission } from './header-constants'

export const HeaderNew = () => {
    const session = useSessionContext();

    if (session.loading) {
        return null;
    }
    const pathname = usePathname();

    const hostingPage = pathname.includes("hosting");

    const permission = hasPermission({
        authed: session.userId ? true : false,
        hostingPage: hostingPage
    })

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
                <div className='flex gap-4 items-center'>
                    <SwitchRoleButton variant={"header"} />
                    <NotificationIcon userId={session?.userId} />
                    <HeaderNavigation hasPermission={permission} />
                </div>
            </div>
        </header>
    )
}
