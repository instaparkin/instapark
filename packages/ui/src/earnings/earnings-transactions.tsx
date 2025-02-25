"use client"

import { useQuery } from '@apollo/client'
import React from 'react'
import { DataTable, DataTableLoading } from '../components/data-table'
import toast from 'react-hot-toast'
import { transactionsColumns } from './earnings-transactions-columns'
import { GET_RECON_DATA } from '../graphql/get-recon-data'
import { EntityType, ReconData } from '../__generated__/graphql'

export const EarningsTransactions = () => {

    const { data, loading, error } = useQuery(GET_RECON_DATA, {
        variables: {
            "orderIds": [
                "order_101803242tGu8koMyd1r0HSPi0wfib8yRvk",
                "order_101803242tGuWkgo10Md19M43rk79IMYsPO"
            ],
            "limit": 10,
            "entityType": EntityType.Transaction
        }
    })

    if (loading) {
        return <DataTableLoading />
    }

    if (error) {
        return toast.error(`${error}`)
    }

    const transactions = data?.VendorQuery?.getReconData

    return (
        <DataTable data={transactions as ReconData[]} columns={transactionsColumns} />
    )
}
