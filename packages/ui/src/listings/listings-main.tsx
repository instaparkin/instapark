"use client"

import { Page } from '../components/page'
import { ListingsTools } from './listings-tools'
import { ListingsDetails } from './listings-details'
import { useEffect, useState } from 'react'

export const ListingsMain = () => {
  const [data, setData] = useState()
  useEffect(()=>{
    async function fetchData(){
      const response = await fetch("http://localhost:8086/search/listingId")
      const data = await response.json();
      setData(data);
    }
    fetchData()
  },[]);

  return (
    <Page title='Listings'>
      {data?.map(r => r.hits.map(h => h.document.listingId))}
      <ListingsTools />
      <ListingsDetails />
    </Page>
  )
}
