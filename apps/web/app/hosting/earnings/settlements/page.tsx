import { EarningsSettlements, Page } from '@instapark/ui'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: "Settlements - Instapark"
}

const SettlementsPage = () => {
  return (
    <Page title='Settlements'>
      <EarningsSettlements />
    </Page>
  )
}

export default SettlementsPage