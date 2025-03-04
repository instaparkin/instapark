import React from 'react';
import { IoTodayOutline } from 'react-icons/io5';
import { BsBuildingCheck } from 'react-icons/bs';
import { TiThListOutline } from 'react-icons/ti';
import { TbDeviceIpadDollar } from 'react-icons/tb';

export const HEADER_NAVIGATION_ITEMS = {
	BUYER: [
		{
			group: 'Menu',
			items: [
				{ icon: <TiThListOutline />, link: '/', name: 'Home' },
				{ icon: <IoTodayOutline />, link: '/trips', name: 'Trips' },
				{ icon: <IoTodayOutline />, link: '/contact-us', name: 'Contact' },
				{ icon: <IoTodayOutline />, link: '/about-us', name: 'About' },
			],
		},
	],
	HOSTING: [
		{
			group: 'Menu',
			items: [
				{
					icon: <TiThListOutline />,
					link: '/hosting/listings',
					name: 'Listings',
				},
				{ icon: <BsBuildingCheck />, link: '/hosting', name: 'Bookings' },
				{
					icon: <TbDeviceIpadDollar />,
					link: '/hosting/earnings',
					name: 'Earnings',
				},
				{
					icon: <TbDeviceIpadDollar />,
					link: '/hosting/payments',
					name: 'Payments',
				},
			],
		},
	],
};
