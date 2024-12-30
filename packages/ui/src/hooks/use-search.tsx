"use client";

import { useEffect, useState } from 'react';
import { ApiResponse, Listing, UseSearchProps } from '../types/typesense-search-types';
import uiConfig from "../../ui-config.json";
import toast from 'react-hot-toast';
import { RootState, setData, useDispatch, useSelector } from '@instapark/state';

export const useSearch = ({ query_by, collections }: UseSearchProps) => {

    const dispatch = useDispatch();

    const query = useSelector((state: RootState) => state.search.query);

    const data = useSelector((state: RootState) => state.search.listingData)

    useEffect(() => {
        async function fetchResults() {
            try {
                const payload = {
                    searches: collections.map(c => ({
                        collection: c.name,
                        q: query || "*",
                        filter_by: c.filter_by,
                    })),
                };

                const response = await fetch(`${uiConfig.routes.LISTINGS_SEARCH_ROUTE}/${query_by.join(",")}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(payload),
                });

                if (response.ok) {
                    const result: ApiResponse = await response.json();
                    const listings = result?.results[0]?.hits?.map(hit => hit.document);
                    dispatch(setData(listings));
                } else {
                    const errorText = await response.text();
                    console.error(`API Error: ${response.status} - ${errorText}`);
                    throw new Error(`Error fetching data: ${response.statusText}`);
                }
            } catch (error) {
                toast.error("Error fetching data: " + error);
            }
        }

        fetchResults();
    }, [query]); 

    return { data };
};
