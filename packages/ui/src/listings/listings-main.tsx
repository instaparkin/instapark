"use client"

import { Page } from '../components/page'
import { ListingsTools } from './listings-tools'
import { ListingsDetails } from './listings-details'
import { useEffect, useState } from 'react'

export const ListingsMain = () => {
  const [data, setData] = useState([{}])
  useEffect(()=>{
    async function fetchData(){
      const response = await fetch("http://localhost:8086/search/*")
      const data = await response.json();
      console.log(data);
      
      setData(data);
    }
    fetchData()
  },[]);

  return (
    <Page title='Listings'>
      <ListingsTools />
      <ListingsDetails />
    </Page>
  )
}
