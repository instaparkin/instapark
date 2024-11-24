import React from 'react'
import { Sheet, SheetContent, SheetTrigger } from '../components/sheet'
import { Icon } from '../components/icon'
import { LuAlignJustify } from 'react-icons/lu'
import { SheetData } from './sheet-data'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../components/dropdown-menu"


export const HamburgerMenu = () => {
  return (
    <div>
      <div className='hidden md:block'>
        <DropdownMenu>
          <DropdownMenuTrigger className='flex items-center justify-center'>
            <Icon>
              <LuAlignJustify className="h-5 w-5" />
            </Icon>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Billing</DropdownMenuItem>
            <DropdownMenuItem>Team</DropdownMenuItem>
            <DropdownMenuItem>Subscription</DropdownMenuItem>
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
            <SheetData />
          </SheetContent>
        </Sheet>
      </div>
    </div>
  )
}
