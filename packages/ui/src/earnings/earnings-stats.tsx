"use client"

import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/card'
import { useQuery } from '@apollo/client'
import { formatPrice } from '../utils/field-name'
import { Button } from '../components/button'
import { Earnings } from '@instapark/types/src/Booking'
import { Table } from 'lucide-react'
import { GET_EARNINGS_DASHBOARD } from '../graphql/get-earnings'
import { Vendor, VendorBalance } from '@instapark/types'
import Link from 'next/link'
import { EarningsStatsSkeleton } from '../skeletons/earnings-stats-skeleton'

export const EarningsStats = () => {
    const { data, loading, error } = useQuery(GET_EARNINGS_DASHBOARD, {
        variables: {
            userId: "0c9e666f-9416-4979-9393-82e1b9d29884",
            vendorId: "uniqueSampleVendorId"
        },
    })

    if (loading) {
        return <EarningsStatsSkeleton />
    }

    const vendorBalance: VendorBalance = data.BookingQuery.getEarningsDashboard.vendorBalance

    const earnings: Earnings = data.BookingQuery.getEarningsDashboard.earnings

    const EARNINGS_HEADER_CONSTANTS = [
        {
            name: "Total Net Profit",
            value: earnings.currentMonth.totalNetProfit,
            previousValue: `vs ${earnings.previousMonth.totalNetProfit} last month`,
            growth: earnings.netPL.totalNetProfitPLPercent,
        },
        {
            name: "Total Bookings",
            value: earnings.currentMonth.totalBookings,
            previousValue: ` vs ${earnings.previousMonth.totalBookings} last month`,
            growth: earnings.netPL.totalBookingsPLPercent,
        },
        {
            name: "Avg Booking Value",
            value: earnings.currentMonth.avgBookingValue,
            previousValue: ` vs ${earnings.previousMonth.avgBookingValue} last month`,
            growth: earnings.netPL.avgBookingValuePLPercent,
        },
        {
            name: "Total Revenue",
            value: earnings.currentMonth.totalRevenue,
            previousValue: `vs ${earnings.previousMonth.totalRevenue} last month`,
            growth: earnings.netPL.totalRevenuePLPercent,
        },
    ]

    return (
        <div className="space-y-6">
            <Card className="bg-primary-foreground">
                <CardContent className="p-6">
                    <div className="space-y-4 md:space-y-2">
                        <p className="text-sm font-medium">Total Balance</p>
                        <div className="flex flex-col gap-6  sm:flex-row sm:items-center justify-between">
                            <h2 className="text-3xl font-bold">
                                {formatPrice(vendorBalance.vendor_unsettled)}
                            </h2>
                            <div className="flex flex-col sm:flex-row  justify-between items-center gap-4">
                                <Button size="lg" asChild>
                                    <Link href={"/hosting/settlements"} className='w-full'>
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
                        <CardHeader className='pb-2'>
                            <CardTitle className="text-sm font-medium">{metric.name}</CardTitle>
                        </CardHeader>
                        <CardContent className=''>
                            <div className="text-2xl font-bold">{metric.value}</div>
                            <p className="text-xs text-muted-foreground mt-1">{metric.previousValue}</p>
                            <div className={`text-sm mt-1 ${metric.growth > 0 ? 'text-green-500' : 'text-red-500'
                                }`}>
                                {metric.growth > 0 ? '+' : ''}{metric.growth}%
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}