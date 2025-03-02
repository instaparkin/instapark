'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/card';
import { useQuery } from '@apollo/client';
import { formatPrice } from '../utils/field-name';
import { Button } from '../components/button';
import { Table } from 'lucide-react';
import { GET_EARNINGS_DASHBOARD } from '../graphql/get-earnings-dashboard';
import Link from 'next/link';
import { EarningsStatsSkeleton } from './earnings-stats-skeleton';
import toast from 'react-hot-toast';

interface EarningsStatsProps {
	userId: string;
	vendorId: string;
}

export const EarningsStats = ({ userId, vendorId }: EarningsStatsProps) => {
	const { data, loading, error } = useQuery(GET_EARNINGS_DASHBOARD, {
		variables: {
			userId,
			vendorId,
		},
	});

	if (loading) {
		return <EarningsStatsSkeleton />;
	}

	if (error) {
		toast.error(`${error}`);
	}

	const vendorBalance = data?.VendorQuery?.getEarningsDashboard?.vendorBalance;

	const earnings = data?.VendorQuery?.getEarningsDashboard?.earnings;

	const EARNINGS_HEADER_CONSTANTS = [
		{
			name: 'Total Net Profit',
			value: earnings?.currentMonth?.totalNetProfit?.toFixed(2),
			previousValue: `vs ${earnings?.previousMonth?.totalNetProfit?.toFixed(2)} last month`,
			growth: earnings?.netPL?.totalNetProfitPLPercent?.toFixed(2),
		},
		{
			name: 'Total Bookings',
			value: earnings?.currentMonth?.totalBookings?.toFixed(2),
			previousValue: ` vs ${earnings?.previousMonth?.totalBookings?.toFixed(2)} last month`,
			growth: earnings?.netPL?.totalBookingsPLPercent?.toFixed(2),
		},
		{
			name: 'Avg Booking Value',
			value: earnings?.currentMonth?.avgBookingValue?.toFixed(2),
			previousValue: ` vs ${earnings?.previousMonth?.avgBookingValue?.toFixed(2)} last month`,
			growth: earnings?.netPL?.avgBookingValuePLPercent?.toFixed(2),
		},
		{
			name: 'Total Revenue',
			value: earnings?.currentMonth?.totalRevenue?.toFixed(2),
			previousValue: `vs ${earnings?.previousMonth?.totalRevenue?.toFixed(2)} last month`,
			growth: earnings?.netPL?.totalRevenuePLPercent?.toFixed(2),
		},
	];

	return (
		<div className="space-y-6">
			<Card className="bg-primary-foreground">
				<CardContent className="p-6">
					<div className="space-y-4 md:space-y-2">
						<p className="text-sm font-medium">Total Balance</p>
						<div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
							<h2 className="text-3xl font-bold">
								{formatPrice(
									parseFloat(vendorBalance?.vendor_unsettled as string),
								)}
							</h2>
							<div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
								<Button size="lg" asChild>
									<Link
										href={'/hosting/earnings/settlements'}
										className="w-full"
									>
										<Table className="mr-2 h-4 w-4" />
										Settlements
									</Link>
								</Button>
							</div>
						</div>
						<p className="text-sm">
							Unsettled amount be settled in two business days
						</p>
					</div>
				</CardContent>
			</Card>

			<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
				{EARNINGS_HEADER_CONSTANTS.map((metric, i) => (
					<Card key={i}>
						<CardHeader className="pb-2">
							<CardTitle className="text-sm font-medium">
								{metric.name}
							</CardTitle>
						</CardHeader>
						<CardContent className="">
							<div className="text-2xl font-bold">{metric.value}</div>
							<p className="text-muted-foreground mt-1 text-xs">
								{metric.previousValue}
							</p>
							<div
								className={`mt-1 text-sm ${
									(metric?.growth as unknown as number) > 0
										? 'text-green-500'
										: 'text-red-500'
								}`}
							>
								{(metric?.growth as unknown as number) > 0 ? '+' : ''}
								{metric.growth}%
							</div>
						</CardContent>
					</Card>
				))}
			</div>
		</div>
	);
};
