"use client"

import React from "react"
import { Order, Payment } from "@instapark/types";
import { ColumnDef } from "@tanstack/react-table";
import { dateToUnixSec, unixSecToMonthYearTime } from "../utils/dayjs";
import { formatAmount } from "../utils/field-name";

export const paymentsColumns: ColumnDef<Payment & { order: Order }>[] = [
    {
        accessorKey: "order.order_id",
        header: "Order Id",
    },
    {
        accessorKey: "paymentType",
        header: "Status",
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
            const value = cell.getValue() as Order;
            return (
                <div className="truncate">
                    {unixSecToMonthYearTime(dateToUnixSec(value.created_at as unknown as Date))}
                </div>
            )
        }
    },
    {
        accessorKey: "order.order_status",
        header: "Status",
        cell: ({ cell }) => {
            const value = cell.getValue();
            return (
                <div className="bg-lime-100 p-2 text-green-600 rounded-sm w-fit">
                    {value as string}
                </div>
            )
        }
    },
]