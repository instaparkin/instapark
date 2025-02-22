"use client"
import React from "react"
import { VendorCommission } from "@instapark/types"
import { ColumnDef } from "@tanstack/react-table"
import { formatPrice } from "../utils/field-name"

export const settlementColumns: ColumnDef<VendorCommission>[] = [
    {
        accessorKey: "merchant_order_id",
        header: "Order Id"
    },
    {
        accessorKey: "vendor_settlement_id",
        header: "Settlement Id"
    },
    {
        accessorKey: "amount",
        header: "Amount",
        cell: ({ cell }) => {
            const value = cell.getValue() as number;
            return (
                <div className="text-positive">
                    {formatPrice(value)}
                </div>
            )
        }
    },
    {
        accessorKey: "status",
        header: "Status",
    },
    {
        accessorKey: "settled",
        header: "Settled",
    },
    {
        accessorKey: "vendor_settlement_time",
        header: "Settlement Time"
    },
]