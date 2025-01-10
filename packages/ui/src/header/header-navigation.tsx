import React from 'react'
import { Sheet, SheetClose, SheetContent, SheetTrigger } from '../components/sheet'
import { Icon } from '../components/icon'
import { LuAlignJustify } from 'react-icons/lu'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../components/dropdown-menu"
import { HEADER_PROTECTED_ITEMS, HEADER_PUBLIC_ITEMS } from "./header-constants"
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { SwitchRoleButton } from '../components/switch-role-button'
import { SignOutButton } from '../auth/sign-out-button'
import { Card, CardContent, CardHeader, CardTitle } from '../components/card'
import { UserButton } from '../auth/user-button'

interface HeaderNavigationProps {
  hasPermission: boolean
}

export const HeaderNavigation = ({ hasPermission }: HeaderNavigationProps) => {

  if (!hasPermission) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger className='flex items-center gap-2 rounded-full border p-1.5'>
          <Icon className='border-none'>
            <LuAlignJustify />
          </Icon>
          <UserButton />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {
            HEADER_PUBLIC_ITEMS.map((item) => {
              return (
                <Link key={item.name} href={item.link}>
                  <DropdownMenuItem>
                    {item.name}
                  </DropdownMenuItem>
                </Link>
              )
            })
          }
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }

  return (
    <>
      <div className='hidden md:block'>
        <DropdownMenu>
          <DropdownMenuTrigger className='flex items-center gap-2 rounded-full border p-1.5'>
            <Icon className='border-none'>
              <LuAlignJustify />
            </Icon>
            <UserButton />
          </DropdownMenuTrigger>
          <DropdownMenuContent className='w-44'>
            {
              HEADER_PROTECTED_ITEMS.data.map((group, index) => {
                return (
                  <div key={index}>
                    <DropdownMenuLabel>
                      {group.group}
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {
                      group.items.map((item, index) => {
                        return (
                          <DropdownMenuItem key={index} className='cursor-pointer my-2 font-normal'>
                            <Link href={item.link}>
                              {item.name}
                            </Link>
                          </DropdownMenuItem>
                        )
                      })
                    }
                  </div>
                )
              })
            }
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className='md:hidden'>
        <Sheet>
          <SheetTrigger className='flex items-center justify-center'>
            <Icon>
              <LuAlignJustify className="h-5 w-5" />
            </Icon>
          </SheetTrigger>
          <SheetContent className='h-[100vh] overflow-y-auto' side={"bottom"}>
            <div className='space-y-6'>
              {
                HEADER_PROTECTED_ITEMS.data.map((group) => (
                  <Card key={group.group} className={`${group == HEADER_PROTECTED_ITEMS.data[0] ? "mt-10" : ""}`}>
                    <CardHeader>
                      <CardTitle>
                        {group.group.toUpperCase()}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className='flex flex-col space-y-6'>
                      {group.items.map((item) => (
                        <Link href={item.link} key={item.name}>
                          <SheetClose className="flex items-center justify-between w-full">
                            <div className="flex items-center space-x-2">
                              <div className="text-md font-medium leading-none">{item.icon}</div>
                              <div className="text-md font-medium leading-none">{item.name}</div>
                            </div>
                            <ChevronRight />
                          </SheetClose>
                        </Link>
                      ))}
                    </CardContent>
                  </Card>
                ))
              }
              <SwitchRoleButton variant={"sheet"} />
              <SignOutButton />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  )
}
