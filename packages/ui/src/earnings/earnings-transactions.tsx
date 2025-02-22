"use client"

import { useQuery } from '@apollo/client'
import React from 'react'
import { GET_TRANSACTIONS } from '../graphql/get-transaction'
import { DataTable, DataTableLoading } from '../components/data-table'
import toast from 'react-hot-toast'
import { transactionsColumns } from './earnings-transactions-columns'

export const EarningsTransactions = () => {

    const { data, loading, error } = useQuery(GET_TRANSACTIONS, {
        variables: {
            "orderIds": [
                "order_101803242tGu8koMyd1r0HSPi0wfib8yRvk",
                "order_101803242tGuWkgo10Md19M43rk79IMYsPO"
            ],
            "limit": 10,
            "entityType": "transaction"
        }
    })

    if (loading) {
        return <DataTableLoading />
    }

    if (error) {
        return toast.error(`${error}`)
    }

    const transactions = data.VendorQuery.getTransactions

    return (
        <DataTable data={transactions} columns={transactionsColumns} />
    )
}
