"use client"

import { ListingsAddLoading } from '@instapark/ui'
import dynamic from 'next/dynamic'
import React from 'react'

const ListingsAddDynamic = dynamic(() =>
    import('@instapark/ui').then((mod) => mod.ListingsAdd), {
    loading: () => (
        <ListingsAddLoading />
    )
})

const ListingsAddPage = () => {
    return (
        <ListingsAddDynamic />
    )
}

export default ListingsAddPage