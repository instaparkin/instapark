"use client";

import React from "react";
import { LuAlignJustify } from "react-icons/lu";
import Link from "next/link";

import { Icon } from "../components/icon";
import {
    Avatar,
    AvatarFallback,
} from "../components/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "../components/dropdown-menu";
import { SignOutButton } from "./sign-out-button";
import { User } from "lucide-react";
import { SwitchRoleButton } from "../components/switch-role-button";
import { USER_BUTTON_DEFAULT_PROTECTED_ITEMS, USER_BUTTON_PUBLIC_ITEMS } from "./auth-constants";
import { ModeToggle } from "../components/mode-toggle";

interface UserButtonProps {
    first_name: string
    userId: string;
    navigationItems: {
        group: string;
        items: {
            icon: React.JSX.Element;
            link: string;
            name: string;
        }[];
    }[];
}

const DropdownItems = (
    items: UserButtonProps["navigationItems"]
) => {
    return items.map(({ group, items }, groupIndex) => (
        <div
            key={groupIndex}
            className={group === "Menu" ? "block lg:hidden" : "block"}
        >
            <DropdownMenuLabel>{group}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {items.map(({ link, name }, itemIndex) => (
                <DropdownMenuItem
                    key={itemIndex}
                    className="cursor-pointer py-2 font-normal"
                >
                    <Link href={link}>{name}</Link>
                </DropdownMenuItem>
            ))}
        </div>
    ));
};

export const UserButton: React.FC<UserButtonProps> = ({
    first_name,
    userId,
    navigationItems,
}) => {
    const userMenuItems = navigationItems.concat(
        USER_BUTTON_DEFAULT_PROTECTED_ITEMS
    );

    return (
        <DropdownMenu modal={false}>
            <DropdownMenuTrigger className="flex items-center gap-2 rounded-full border p-1.5">
                <Icon className='border-none'>
                    <LuAlignJustify />
                </Icon>
                <span className="hidden sm:block">
                    {userId ? (
                        <Avatar>
                            <AvatarFallback>{first_name?.at(0)}</AvatarFallback>
                        </Avatar>
                    ) : (
                        <Icon>
                            <User className="h-5 w-5 text-muted-foreground" />
                        </Icon>
                    )}
                </span>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-52 p-2 dark:text-muted-foreground">
                {userId
                    ? DropdownItems(userMenuItems)
                    :
                    USER_BUTTON_PUBLIC_ITEMS.map((item) => (
                        <Link key={item.name} href={item.link}>
                            <DropdownMenuItem>{item.name}</DropdownMenuItem>
                        </Link>
                    ))}
                <DropdownMenuSeparator />
                <DropdownMenuLabel
                    className="font-normal flex justify-between items-center">
                    <span>
                        Theme
                    </span>
                    <ModeToggle />
                </DropdownMenuLabel>
                {userId && (
                    <>
                        <DropdownMenuSeparator />
                        <SwitchRoleButton variant="dropdown" />
                        <SignOutButton />
                    </>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
