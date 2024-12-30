"use client"

import { AppDispatch, searchListings, useDispatch } from '@instapark/state'
import { Page } from '../components/page'
import { SearchListingsComponent } from '../search/search-listings-component'
import { SearchListingsFilter } from '../search/search-listings-filter'
import { HomeListingsResults } from './home-listings-results'
import { useEffect } from 'react'
import { SuggestedDestinations } from './suggested-searches'
import { HomeFacets } from './home-facets'

export const HomeMain = () => {
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(searchListings({
            query_by: ["*"],
            collections: [{
                q: "*",
                name: "listing_1"
            }]
        }))
    }, []);

    return (
        <Page className='mt-16'>
            <div className='flex gap-4 items-center'>
                <SearchListingsComponent >
                    <SuggestedDestinations />
                </SearchListingsComponent>
                <SearchListingsFilter />
            </div>
            <HomeFacets />
            <HomeListingsResults />
        </Page>
    )
}
