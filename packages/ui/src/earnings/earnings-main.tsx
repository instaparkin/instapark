"use client"

import React from 'react'
import { EarningsMonthly } from './earnings-monthly'
import { EarningsHeader } from './earnings-header'
import { EarningsVisitors } from './earnings-visitors'

export const EarningsMain = () => {
  /**
   * TODO:
   * 1. Pass the props from here with proper type definitions
   * 2. Create the transactions Data Table
   * 3. Create a GraphQL query to fetch bookings for the graph
   */
  return (
    <div className=''>
      <EarningsHeader />
      <EarningsVisitors />
    </div>
  )
}
