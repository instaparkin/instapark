"use client"

import React from "react"
import { AppDispatch, RootState, searchListings, useDispatch, useSelector } from '@instapark/state'
import { Page } from '../components/page'
import { SearchListingsComponent } from '../search/search-listings-component'
import { SearchListingsFilter } from '../search/search-listings-filter'
import { HomeListingsResults } from './home-listings-results'
import { useEffect } from 'react'
import { SuggestedDestinations } from './suggested-searches'
import { HomeFacets } from './home-facets'
import { DatePickerWithRange } from "../components/date-picker-demo"
import { Button } from "../components/button"
import axios from "axios"
import { SearchHeader } from "../search/search-listings"
import { SearchMain } from "../search/search-main"
import { SearchHits } from "../search/search-hits"

export const HomeMain = () => {
    return (
        <Page className='mt-16'>
            <SearchHeader />
            <HomeFacets />
        </Page>
    )
}
