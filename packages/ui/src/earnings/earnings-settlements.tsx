"use client"

import { useQuery } from '@apollo/client'
import React from 'react'
import { DataTable, DataTableLoading } from '../components/data-table'
import toast from 'react-hot-toast'
import { settlementColumns } from './earnings-settlement-columns'
import { GET_SETTLEMENTS } from '../graphql/get-settlements'
import { VendorCommission } from '@instapark/types'
import { ColumnDef } from '@tanstack/react-table'

export const EarningsSettlements = () => {
  const { data, loading, error } = useQuery(GET_SETTLEMENTS, {
    variables: {
      "orderIds": [
        "order_101803242tGu8koMyd1r0HSPi0wfib8yRvk",
        "order_101803242tGuWkgo10Md19M43rk79IMYsPO"
      ],
      "limit": 10,
      "entityType": "vendor_commision"
    }
  })

  if (loading) {
    return <DataTableLoading />
  }

  if (error) {
    return toast.error(`${error}`)
  }

  return (
    <DataTable
      data={data?.VendorQuery?.getTransactions as VendorCommission[]}
      columns={settlementColumns} />
  )
}
