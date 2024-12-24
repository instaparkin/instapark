"use client"

import { HostingLoading } from '@instapark/ui'
import dynamic from 'next/dynamic'
import React from 'react'

const HostingMainDynamic = dynamic(() => (
  import("@instapark/ui").then(mod => mod.HostingMain)
), {
  loading: () => <HostingLoading />
})

const HostingPage = () => {
  return (
    <HostingMainDynamic />
  )
}

export default HostingPage