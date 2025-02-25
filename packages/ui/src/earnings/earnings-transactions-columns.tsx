"use client"
import React from "react"
import { Transaction } from "@instapark/types"
import { ColumnDef } from "@tanstack/react-table"
import { formatPrice } from "../utils/field-name"
import { ReconData } from "../__generated__/graphql"

export const transactionsColumns: ColumnDef<ReconData>[] = [
    {
        accessorKey: "merchant_order_id",
        header: "Order Id"
    },
    {
        accessorKey: "amount",
        header: "Amount",
        cell: ({ cell }) => {
            const value = cell.getValue() as number;
            return (
                <div>
                    {formatPrice(value)}
                </div>
            )
        }
    },
    {
        accessorKey: "merchant_vendor_commission",
        header: "Commision",
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
        accessorKey: "pg_service_charge",
        header: "Service Charge",
        cell: ({ cell }) => {
            const value = cell.getValue() as number;
            return (
                <div>
                    {formatPrice(value)}
                </div>
            )
        }
    },
    {
        accessorKey: "settled",
        header: "Settled"
    },
]
