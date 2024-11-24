import { IoTodayOutline } from "react-icons/io5";
import { Separator } from "../components/separator";
import { BsBuildingCheck } from "react-icons/bs";
import { TiThListOutline } from "react-icons/ti";
import { TbDeviceIpadDollar } from "react-icons/tb";
import { ChevronRight } from "lucide-react";
import { FaRegUser } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import Link from "next/link";
import { SheetClose } from "../components/sheet";
import { SignOutButton } from "../auth/sign-out-button";
import { SwitchRoleButton } from "../components/switch-role-button";

export const SheetData = () => {
  const sellerData = {
    role: "Seller",
    switch: "Switch to Buyer",
    data: [
      {
        group: "MENU",
        items: [
          {
            icon: <IoTodayOutline />,
            link: "/today",
            name: "Today"
          },
          {
            icon: <TiThListOutline />,
            link: "/listings",
            name: "Listings"
          },
          {
            icon: <BsBuildingCheck />,
            link: "/bookings",
            name: "Bookings"
          },
          {
            icon: <TbDeviceIpadDollar />,
            link: "/earnings",
            name: "Earnings"
          },
        ]
      },
      {
        group: "ACCOUNT",
        items: [
          {
            icon: <FaRegUser />,
            link: "/profile",
            name: "Profile"
          },
          {
            icon: <IoSettingsOutline />,
            link: "/settings",
            name: "Settings"
          }
        ]
      }
    ]
  }
  return (
    <div>
      {
        sellerData.data.map((group) => (
          <div key={group.group}>
            <div className="my-6" >
              <h2 className="text-md font-semibold text-muted-foreground mb-4">{group.group}</h2>
              <div className="flex flex-col space-y-5">
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
              </div>
            </div>
            <Separator />
          </div>
        ))
      }
      <SwitchRoleButton />
      <SignOutButton />
    </div>
  )
}
