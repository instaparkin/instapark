"use client"

import { Page } from '../components/page'
import { ListingsTools } from './listings-tools'
import { ListingsDetails } from './listings-details'

export const ListingsMain = () => {
  return (
    <Page title='Listings'>
      <ListingsTools />
      <ListingsDetails />
    </Page>
  )
}
