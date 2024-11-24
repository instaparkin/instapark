import React from 'react'
import { Page } from '../components/page'
import { EarningsMonthly } from './earnings-monthly'
import { EarningsVisitors } from './earnings-visitors'

export const EarningsMain = () => {
  return (
    <Page title="Earnings">
      <EarningsMonthly />
      <EarningsVisitors />
    </Page>
  )
}
