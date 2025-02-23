"use client"

import React from 'react'
import { EarningsStats } from './earnings-stats'
import { EarningsTransactions } from './earnings-transactions'
import { MapsSearch } from '../maps/maps-search'

export const EarningsMain = () => {
  /**
   * TODO:
   * 1. Pass the props from here with proper type definitions
   * 2. Create the transactions Data Table
   */
  return (
    <div className='space-y-6'>
      <EarningsStats />
      <h2 className='text-lg font-semibold'>Transactions</h2>
      <EarningsTransactions />
    </div>
  )
}
