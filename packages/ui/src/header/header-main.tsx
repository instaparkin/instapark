import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "../components/sheet";
import { LuAlignJustify } from "react-icons/lu";
import { Avatar, AvatarFallback, AvatarImage } from '../components/avatar';
import { NotificationIcon } from '../components/notification-icon';
import { SheetData } from './sheet-data';
import { Icon } from '../components/icon';
import { SwitchRoleButton } from "../components/switch-role-button";
import { RootState, useSelector } from "@instapark/state";
import { headerConfig } from "./header-config";
import { HamburgerMenu } from "./hamburger-menu";
import { NotificationPopover } from "./notification-popover";

export const Header = () => {
    const { currentRole } = useSelector((state: RootState) => state.user);

    const components = headerConfig[currentRole];

    return (
        <header>
            <div className='flex justify-between gap-4 py-4'>
                <Avatar className=''>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>Instapark</AvatarFallback>
                </Avatar>
                <div className="hidden md:flex w-full gap-4 justify-end">
                    {components.map((component, index) => (
                        <div className="w-full" key={index}>
                            {component}
                        </div>
                    ))}
                    <SwitchRoleButton />
                </div>
                <div className='flex gap-4 items-center'>
                    <NotificationPopover />
                    <HamburgerMenu />
                </div>
            </div>
            <div>
                {components.map((component, index) => (
                    <div className="w-full md:hidden" key={index}>
                        {component}
                    </div>
                ))}
            </div>
        </header>
    )
}
