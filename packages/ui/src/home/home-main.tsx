"use client"

import { Page } from '../components/page'
import { SearchListingsComponent } from '../search/search-listings-component'
import { SearchListingsFilter } from '../search/search-listings-filter'
import { HomeListingsResults } from './home-listings-results'

export const HomeMain = () => {
    return (
        <Page>
            <div className='flex gap-4 items-center'>
                <SearchListingsComponent children={undefined} />
                <SearchListingsFilter />
            </div>
            <HomeListingsResults />
        </Page>
    )
}
