"use client"

import React from 'react'
import { EarningsMonthly } from './earnings-monthly'
import { EarningsHeader } from './earnings-header'

export const EarningsMain = () => {
  return (
    <>
      <EarningsHeader />
      <EarningsMonthly />
    </>
  )
}
