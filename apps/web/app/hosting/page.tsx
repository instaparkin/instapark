"use client"

import { HostingLoading, Page } from '@instapark/ui'
import dynamic from 'next/dynamic'
import React from 'react'

const HostingMainDynamic = dynamic(() => (
  import("@instapark/ui").then(mod => mod.HostingMain)
), {
  loading: () =>
    <HostingLoading />
})

const HostingPage = () => {
  return (
    <Page>
      <HostingMainDynamic />
    </Page>
  )
}

export default HostingPage