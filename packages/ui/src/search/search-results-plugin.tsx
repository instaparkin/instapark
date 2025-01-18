import { AutocompletePlugin } from '@algolia/autocomplete-js';
import { Listing } from '@instapark/types';
import { SearchSuggestion } from './search-suggestion';
import { useHits } from 'react-instantsearch';
import { NoResults } from '../components/no-results';
import { BaseItem } from '@algolia/autocomplete-core';

type SearchResultsPluginProps = {
    per_page?: number;
    page?: number;
};

export function searchResultsPlugin(
    options: SearchResultsPluginProps = {}
): AutocompletePlugin<Listing, undefined> {

    const { items } = useHits()
    return {
        async getSources({ query }: { query: string }) {
            return [
                {
                    sourceId: 'listing_1',
                    onSelect(params) {

                    },

                    getItems({ query }) {
                        console.log(query);
                        return items;
                    },
                    getItemInputValue({ item }: { item: Listing }) {
                        return item.country;
                    },
                    templates: {
                        item({ item }: { item: Listing }) {
                            return (
                                <SearchSuggestion suggestion={item} />
                            )
                        },
                        noResults() {
                            return (
                                <NoResults text="No Results" />
                            );
                        },
                    },
                },
            ];
        },
    }
}
