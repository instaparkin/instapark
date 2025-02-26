import { Page, TripDetailed } from '@instapark/ui'
import { Metadata } from 'next'
import React from 'react'

type Props = {
    params: Promise<{ id: string }>
}

export const metadata: Metadata = {
    title: "Trip Details - Instapark"
}

const TripDetailedPage = async (
    {
        params,
    }: Props
) => {
    const id = (await params).id;
    if (id === "undefined" || !id) {
    }
    return (
        <Page>
            <TripDetailed id={id} />
        </Page>
    )
}

export default TripDetailedPage