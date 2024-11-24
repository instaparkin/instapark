"use client"

import React from 'react'
import { Hits, InstantSearch, Pagination, SearchBox, SortBy, Stats } from "react-instantsearch"
import { typesenseSearchClient } from "@instapark/search"

export const TypesenseSearch = () => {
    return (
        <InstantSearch searchClient={typesenseSearchClient} indexName="listings" >
            <div className="flex flex-col p-4">
                <SearchBox
                    classNames={{
                        input: "bg-neutral-800 p-2 rounded-md w-full text-white",
                        resetIcon: "text-white"
                    }}
                />
                <Stats classNames={{
                    root: "p-2"
                }} />
                <Hits
                    contextMenu="true"
                    classNames={{
                        list: "grid grid-cols-4"
                    }} hitComponent={({ hit }) => {
                        return (
                            <div>
                                <div className="border font-bold p-2">{JSON.stringify(hit)}</div>
                            </div>
                        )
                    }} />
            </div>
        </InstantSearch>
    )
}
