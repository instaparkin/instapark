"use client"

import { Page } from '../components/page'
import { ListingsTools } from './listings-tools'
import { ListingsDetails } from './listings-details'
import { TypesenseSearch } from '../search/search-input'

export const ListingsMain = () => {
  return (
    <Page title='Listings'>
      <ListingsTools />
      <ListingsDetails />
      <TypesenseSearch />
    </Page>
  )
}
