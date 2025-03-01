"use client"

import React from "react"
import { ColumnDef } from "@tanstack/react-table";
import { dateToUnixSec, unixSecToMonthYearTime } from "../utils/dayjs";
import { formatAmount } from "../utils/field-name";
import { Payment } from "../__generated__/graphql";

export const paymentsColumns: ColumnDef<Payment>[] = [
    {
        accessorKey: "order.order_id",
        header: "Order Id",
    },
    {
        accessorKey: "paymentType",
        header: "Status",
        cell: ({ cell }) => {
            const value = cell.getValue();
            switch (value) {
                case "Booking":
                    return (
                        <div className="bg-blue-200 text-blue-700  p-2 w-fit rounded-sm">
                            {value}
                        </div>
                    )
                case "Completed":
                    return (
                        <div className="bg-lime-200 text-lime-700 p-2 w-fit rounded-sm">
                            {value}
                        </div>
                    )
            }
        }
    },
    {
        accessorKey: "order.order_amount",
        header: "Amount",
        cell: ({ cell }) => {
            const value = cell.getValue();
            return (
                <div>
                    {formatAmount(value as number)}
                </div>
            )
        }
    },
    {
        accessorKey: "order.created_at",
        header: "Date & Time",
        cell: ({ cell }) => {
            const value = cell.getValue();
            return (
                <div className="truncate">
                    {unixSecToMonthYearTime(dateToUnixSec(value as unknown as Date))}
                </div>
            )
        }
    },
    {
        accessorKey: "order.order_status",
        header: "Payment Status",
        cell: ({ cell }) => {
            const value = cell.getValue();
            return (
                <div className="p-2 text-positive rounded-sm w-fit">
                    {value as string}
                </div>
            )
        }
    },
]