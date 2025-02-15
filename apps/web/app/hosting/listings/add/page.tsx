"use client"

import { ListingsAddLoading, Page } from '@instapark/ui'
import dynamic from 'next/dynamic'
import React from 'react'

const ListingsAddDynamic = dynamic(() =>
    import('@instapark/ui').then((mod) => mod.ListingsAdd), {
    loading: () => (
        <Page>
            <ListingsAddLoading />
        </Page>
    )
})

const ListingsAddPage = () => {
    return (
        <Page>
            <ListingsAddDynamic />
        </Page>
    )
}

export default ListingsAddPage