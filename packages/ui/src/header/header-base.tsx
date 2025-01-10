import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '../components/avatar';
import { SwitchRoleButton } from "../components/switch-role-button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../components/dropdown-menu';
import { Icon } from '../components/icon';
import { LuAlignJustify } from 'react-icons/lu';
import { HEADER_PUBLIC_ITEMS } from './header-constants';
import { BRAND_LOGO, BRAND_NAME } from '../brand/brand-constants';
import { UserButton } from '../auth/user-button';
import { NotificationIcon } from '../components/notification-icon';
import { HTMLAttributes, ReactNode } from 'react';

interface HeaderBaseProps extends HTMLAttributes<HTMLDivElement> {
    navigation: ReactNode
}

export const HeaderBase: React.FC<HeaderBaseProps> = ({ children, className }) => {
    return (
        <header className="fixed top-0 right-0 z-20 bg-background w-full mx-auto border-b">
            <div className='container flex justify-between py-4'>
                <Link href="/" className='flex gap-4 items-center'>
                    <Avatar>
                        <AvatarImage width={200} height={200} src={BRAND_LOGO} />
                        <AvatarFallback>{BRAND_NAME[0]}</AvatarFallback>
                    </Avatar>
                    <div className='hidden sm:flex text-lg font-semibold text-[#010080]'>{BRAND_NAME}</div>
                </Link>
                <div className='flex gap-4 items-center'>
                    <SwitchRoleButton />
                    {children}
                </div>
            </div>
        </header>
    )
}
