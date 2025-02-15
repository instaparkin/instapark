import React from "react"
import { IoTodayOutline } from "react-icons/io5";
import { BsBuildingCheck } from "react-icons/bs";
import { TiThListOutline } from "react-icons/ti";
import { TbDeviceIpadDollar } from "react-icons/tb";
import { FaRegUser } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";

export const HEADER_NAVIGATION_ITEMS = {
  BUYER: [
      {
          group: "Menu",
          items: [
              { icon: <IoTodayOutline />, link: "/reservations", name: "Trips" },
              { icon: <TiThListOutline />, link: "/hosting/listings", name: "Wishlists" }
          ]
      }
  ],
  HOSTING: [
      {
          group: "Menu",
          items: [
              { icon: <IoTodayOutline />, link: "/hosting/today", name: "Today" },
              { icon: <TiThListOutline />, link: "/hosting/listings", name: "Listings" },
              { icon: <BsBuildingCheck />, link: "/bookings", name: "Bookings" },
              { icon: <TbDeviceIpadDollar />, link: "/hosting/earnings", name: "Earnings" }
          ]
      },
  ]
};
