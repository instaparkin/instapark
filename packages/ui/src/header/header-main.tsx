import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '../components/avatar';
import { SwitchRoleButton } from "../components/switch-role-button";
import { HeaderNavigation } from "./header-navigation";
import { NotificationIcon } from '../components/notification-icon';

export const HeaderMain = () => {
    return (
        <header className="fixed top-0 right-0 z-20 bg-background w-full mx-auto border-b">
            <div className='container flex justify-between py-4'>
                <Link href="/" className='flex gap-4 items-center'>
                    <Avatar>
                        <AvatarImage width={200} height={200} src="/instapark.svg" />
                        <AvatarFallback>P</AvatarFallback>
                    </Avatar>
                    <div className='hidden sm:flex text-lg font-semibold text-[#010080]'>Instapark</div>
                </Link>
                <div className='flex gap-4 items-center'>
                    <SwitchRoleButton />
                    <Link href={"/messages"}>
                        <NotificationIcon hasNotifications={true} />
                    </Link>
                    <HeaderNavigation />
                </div>
            </div>
        </header>
    )
}
