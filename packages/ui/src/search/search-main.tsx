"use client";

import { InstantSearchNext } from 'react-instantsearch-nextjs';
import { Hits, Pagination, RefinementList, ClearRefinements, useHits } from "react-instantsearch";
import { typesenseInstantsearchAdapter } from '../typesense/instantsearch-adapter';
import { Listing } from '@instapark/types';
import { ListingCard } from '../components/listing-card';
import { Autocomplete } from './search-autocomplete';
import { SearchListingsFilter } from './search-listings-filter';
import { SearchHeader } from './search-listings';
import { Button } from '../components/button';
import { useRef } from 'react';
import { cn } from '../utils/cn';
import { searchResultsPlugin } from './search-results-plugin';

export function Hit({ hit }: { hit: Listing }) {
    return <ListingCard listing={hit} />;
}

interface SearchHeaderProps extends React.HTMLAttributes<HTMLDivElement> { }

export const SearchHeadera: React.FC<SearchHeaderProps> = ({ children }) => {
    return (
        <div className="flex flex-1">
            {children}
        </div>
    );
};


interface SearchHeaderGroupProps extends React.HTMLAttributes<HTMLDivElement> { }

export const SearchHeaderGroup: React.FC<SearchHeaderGroupProps> = ({ children }) => {
    return (
        <div className="flex w-full gap-4">
            {children}
        </div>
    );
};

interface SearchFooterProps extends React.HTMLAttributes<HTMLDivElement> { }

export const SearchFooter: React.FC<SearchFooterProps> = ({ children }) => {
    return (
        <div className="flex justify-center w-full mx-auto py-4 my-4">
            {children}
        </div>
    );
};

interface SearchRootProps extends React.HTMLAttributes<HTMLDivElement> { }

export const SearchRoot: React.FC<SearchRootProps> = ({ children, className }) => {
    return (
        <InstantSearchNext routing={true} indexName="listing_1" searchClient={typesenseInstantsearchAdapter.searchClient}>
            <div className={cn(className, "p-4")}>{children}</div>
        </InstantSearchNext>
    );
};

export const SearchMain = () => {
    return (
        <SearchRoot>
            <SearchHeadera>
                <SearchHeaderGroup>
                    <Autocomplete openOnFocus placeholder='Search Listings' />
                    <Button size="lg">Search </Button>
                </SearchHeaderGroup>
                <SearchHeaderGroup>
                    <SearchListingsFilter
                        ClearFilters={
                            <ClearRefinements
                                classNames={{
                                    root: "flex items-center",
                                    button: "font-semibold cursor-pointer hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 rounded-md",
                                }}
                                translations={{ resetButtonText: "Clear all" }}
                            />
                        }
                    />
                    <SearchHeader />
                </SearchHeaderGroup>
            </SearchHeadera>
            <RefinementList
                attribute="city"
                classNames={{
                    label: "flex items-center gap-2 justify-between w-full",
                    checkbox: "h-4 w-4 rounded-md bg-red-400 text-red-400 fil-red-400",
                    labelText: "",
                    count: "px-2",
                    root: "flex",
                    item: "my-2",
                }}
            />
            <Hits
                classNames={{
                    list: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10",
                }}
                hitComponent={Hit}
            />
            <SearchFooter>
                <Pagination
                    classNames={{
                        list: "flex items-center",
                        item: "p-2 h-12 w-12 flex items-center justify-center cursor-pointer border",
                        firstPageItem: "rounded-l-md",
                        lastPageItem: "rounded-r-md",
                        selectedItem: "flex items-center justify-center bg-primary text-background",
                    }}
                />
            </SearchFooter>
        </SearchRoot>
    );
};
