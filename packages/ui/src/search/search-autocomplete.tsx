"use client"

import {
  createElement,
  Fragment,
  useEffect,
  useRef,
  useState
} from "react";
import { createRoot, Root } from "react-dom/client";
import {  usePagination, useSearchBox } from "react-instantsearch";
import { autocomplete, AutocompleteOptions } from "@algolia/autocomplete-js";
import { BaseItem } from "@algolia/autocomplete-core";
import { NoResults } from "../components/no-results";
import { cn } from "../utils/cn";
import { Listing } from "@instapark/types";
import { typesenseInstantsearchAdapter } from "../typesense/instantsearch-adapter";
import "../styles/theme.min.css"

type AutocompleteProps = Partial<AutocompleteOptions<BaseItem>> & {
  className?: string;
};

type SetInstantSearchUiStateOptions = {
  query: string;
};

import { useConnector } from 'react-instantsearch';
import connectAutocomplete from 'instantsearch.js/es/connectors/autocomplete/connectAutocomplete';

import type {
  AutocompleteConnectorParams,
  AutocompleteWidgetDescription,
} from 'instantsearch.js/es/connectors/autocomplete/connectAutocomplete';
import axios from "axios";

export type UseAutocompleteProps = AutocompleteConnectorParams;

// Connect the InstantSearch.js `connectAutocomplete` connector to your component
export function useAutocomplete(props?: UseAutocompleteProps) {
  return useConnector<AutocompleteConnectorParams, AutocompleteWidgetDescription>(
    connectAutocomplete,
    props
  );
}

export function Autocomplete({
  className,
  ...autocompleteProps
}: AutocompleteProps) {
  const autocompleteContainer = useRef<HTMLDivElement>(null);
  const panelRootRef = useRef<Root | null>(null);
  const rootRef = useRef<HTMLElement | null>(null);

  const { query, refine: setQuery } = useSearchBox();

  const { refine: setPage } = usePagination();
  const [instantSearchUiState, setInstantSearchUiState] = useState<
    SetInstantSearchUiStateOptions
  >({ query });

  useEffect(() => {
    setQuery(instantSearchUiState.query);
    setPage(0);
  }, [instantSearchUiState]);

  useEffect(() => {
    if (!autocompleteContainer.current) {
      return;
    }
    typesenseInstantsearchAdapter.typesenseClient.multiSearch.perform
    const autocompleteInstance = autocomplete({
      ...autocompleteProps,
      classNames: {
        input: "bg-red-400"
      },
      container: autocompleteContainer.current,
      initialState: { query },
      getSources<BaseItem>({ query }: { query: string }) {
        return [
          {
            sourceId: 'listing_1',
            onActive({ item, setContext }) {
              setContext({ item });
            },
            async getItems({ query }) {
              return axios.post("http://localhost:8108/multi_search", {
                "searches": [
                  {
                    "collection": "listing_queries",
                    "q": query,
                    "query_by": "q"
                  }
                ]
              }, {
                headers: {
                  "x-typesense-api-key": "xyz"
                }
              }).then(res => res.data.results[0].hits.map(h => h.document));
            },
            getItemInputValue({ item }: { item: Listing }) {
              return item.q;
            },
            templates: {
              item({ item }: { item: Listing }) {
                return (
                  <div>{item.q}</div>
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
      onReset() {
        setInstantSearchUiState({ query: "" });
      },
      onSubmit({ state }) {
        setInstantSearchUiState({ query: state.query });
      },
      renderer: {
        createElement, Fragment, render: () => { }
      },
      render({ children }, root) {
        if (!panelRootRef.current || rootRef.current !== root) {
          rootRef.current = root;

          panelRootRef.current?.unmount();
          panelRootRef.current = createRoot(root);
        }

        panelRootRef.current.render(children);
      },
    });

    return () => autocompleteInstance.destroy();
  }, []);

  return (
    <div className={cn(className,)} ref={autocompleteContainer} />
  )
}
