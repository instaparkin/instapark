import { IoTodayOutline } from "react-icons/io5";
import { BsBuildingCheck } from "react-icons/bs";
import { TiThListOutline } from "react-icons/ti";
import { TbDeviceIpadDollar } from "react-icons/tb";
import { FaRegUser } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";

export const HEADER_PROTECTED_ITEMS = {
  data: [
    {
      group: "Menu",
      items: [
        {
          icon: <IoTodayOutline />,
          link: "/today",
          name: "Today"
        },
        {
          icon: <TiThListOutline />,
          link: "/hosting/listings",
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
      group: "Account",
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

export const HEADER_PUBLIC_ITEMS = [
  {
    name : "Sign Up",
    link : "/auth"
  },
  {
    name : "Sign In",
    link : "/auth"
  }
]