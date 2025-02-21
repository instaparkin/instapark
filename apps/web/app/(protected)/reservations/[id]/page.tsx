import { Page, TripDetailed } from '@instapark/ui'
import { Metadata, ResolvingMetadata } from 'next'
import Router from 'next/navigation'
import React from 'react'

type Props = {
    params: Promise<{ id: string }>
}

export async function generateMetadata(
    { params }: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {
    const id = (await params).id
    const previousImages = (await parent).openGraph?.countryName
    return {
        title: "product.title",
    }
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