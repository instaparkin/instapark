"use client"

import { HostingLoading, Page, useCurrentPage } from '@instapark/ui'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import React from 'react'

const HostingMainDynamic = dynamic(() => (
  import("@instapark/ui").then(mod => mod.HostingMain)
), {
  loading: () => (
    <Page>
      <HostingLoading />
    </Page>)
})

const HostingPage = () => {
  return (
    <Page>
      <Head>
        <title>Host da</title>
      </Head>
      <HostingMainDynamic />
    </Page>
  )
}

export default HostingPage