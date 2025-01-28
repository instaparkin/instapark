"use client"

import React from 'react'
import { Page } from '../components/page'
import { ListingsTools } from './listings-tools'
import { useEffect, useState } from 'react'
import { ListingsView } from './listings-view-hosting'
import { Listing } from '@instapark/types'
import axios from 'axios'

export const ListingsMain = () => {

  const [data, setData] = useState<Listing[]>([])


  useEffect(() => {
    axios.post(`http://localhost:8087/search/*`, {
      "searches": [
        {
          "collection": "listing_1",
          "q": "*"
        }
      ]
    })
      .then(res => {
        console.log(res.data);
        setData(res.data.results[0]?.hits?.map((hit: { document: Listing }) => hit.document) || []);
      })
      .catch((error) => {
        console.log(error);

      })
  }, [])

  return (
    <Page title='Listings'>
      <ListingsTools />
      <ListingsView data={data} />
    </Page>
  )
}
