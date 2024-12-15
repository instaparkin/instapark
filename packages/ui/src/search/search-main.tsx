import React from 'react'
import { SearchInput } from '../components/search-input'
import { Button } from '../components/button'
import { Page } from '../components/page'
import { SearchResults } from './search-results'
import { TypesenseSearch } from './search-input'

export const SearchMain = () => {
    return (
        <Page>
            <TypesenseSearch />
        </Page>
    )
}
