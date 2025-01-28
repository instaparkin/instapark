"use client";

import { InstantSearchNext } from 'react-instantsearch-nextjs';
import { Hits, Pagination, ClearRefinements, useInstantSearch, RefinementList, RangeInput, TrendingItems, Configure } from "react-instantsearch";
import { typesenseInstantsearchAdapter } from '../typesense/instantsearch-adapter';
import { Listing } from '@instapark/types';
import { ListingCard } from '../components/listing-card';
import { Autocomplete } from './search-autocomplete';
import { SearchListingsFilter } from './search-listings-filter';
import { SearchHeader } from './search-listings';
import { Button } from '../components/button';
import { cn } from '../utils/cn';
import { CustomHits } from './Hit-hook';
import { ReactNode } from 'react';
import { NoResults } from '../components/no-results';
import { Search } from 'lucide-react';
import { DateRangeFilter } from './date-picker';
import { history } from 'instantsearch.js/es/lib/routers';
import { useSearch } from '../hooks/use-search';
import { MapsMain } from '../maps/maps-main';


export function Hit({ hit }: { hit: Listing }) {
  return <ListingCard listing={hit} />;
}

interface SearchHeaderProps extends React.HTMLAttributes<HTMLDivElement> { }

export const SearchHeadera: React.FC<SearchHeaderProps> = ({ children }) => {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-screen mx-auto border-b py-4 pb-8">
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

interface SearchContentProps extends React.HTMLAttributes<HTMLDivElement> { }

export const SearchContent: React.FC<SearchContentProps> = ({ children }) => {
  return (
    <div className="container my-8">
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
    <InstantSearchNext
      routing={true}
      indexName="listing_1"
      searchClient={typesenseInstantsearchAdapter.searchClient}
    >
      <div className="p-4 max-w-[1400px] mx-auto">
        <SearchHeader />
        <NoResultsBoundary fallback={<NoResults icon={<Search />} text='No results' />}>
          <RefinementList attribute='allowedVehicles' />
          <RefinementList attribute='type' />
          <div className="mt-8">
            <Hits
              classNames={{
                list: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6",
              }}
              hitComponent={Hit}
            />
          </div>
          <div className="flex justify-center mt-8">
            <Pagination
              classNames={{
                list: "flex items-center gap-1",
                item: "h-10 w-10 flex items-center justify-center rounded border hover:bg-accent",
                selectedItem: "bg-primary text-primary-foreground hover:bg-primary/90",
              }}
            />
          </div>
        </NoResultsBoundary>
      </div>
    </InstantSearchNext >
  )
}

interface NoResultsBoundaryProps {
  children: ReactNode
  fallback: ReactNode
}

function NoResultsBoundary({ children, fallback }: NoResultsBoundaryProps) {
  const { results } = useInstantSearch();

  if (!results.__isArtificial && results.nbHits === 0) {
    return (
      <>
        {fallback}
        <div hidden>{children}</div>
      </>
    );
  }

  return children;
}
