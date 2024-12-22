"use client"

import { ListingsLoading, ListingsMain } from '@instapark/ui'
import React from 'react'
import dynamic from "next/dynamic"

const ListingsMainDynamic = dynamic(() =>
    import('@instapark/ui').then((mod) => mod.ListingsMain), {
    loading: () => (
        <ListingsLoading />
    )
})

const ListingsPage = () => {
    return (
        <ListingsMainDynamic />
    )
}

export default ListingsPage