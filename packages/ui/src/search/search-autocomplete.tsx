import React, { useMemo } from "react";
import {
  createElement,
  Fragment,
  useEffect,
  useRef,
  useState
} from "react";
import { createRoot, Root } from "react-dom/client";


import { useHits, useInstantSearch, usePagination, useSearchBox } from "react-instantsearch";
import { autocomplete, AutocompleteOptions } from "@algolia/autocomplete-js";
import { BaseItem } from "@algolia/autocomplete-core";
import { createQuerySuggestionsPlugin } from "@algolia/autocomplete-plugin-query-suggestions";

import "@algolia/autocomplete-theme-classic";
import { NoResults } from "../components/no-results";
import { cn } from "../utils/cn";
import { useConnector } from 'react-instantsearch';
import connectAutocomplete from 'instantsearch.js/es/connectors/autocomplete/connectAutocomplete';
import { Listing } from "@instapark/types";
import { SearchSuggestion } from "./search-suggestion";

// Connect the InstantSearch.js `connectAutocomplete` connector to your component
export function useAutocomplete() {
  return useConnector(connectAutocomplete);
}

type AutocompleteProps = Partial<AutocompleteOptions<BaseItem>> & {
  className?: string;
};

type SetInstantSearchUiStateOptions = {
  query: string;
};

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

  const { results, items, banner} = useHits();

  const { setUiState, setIndexUiState } = useInstantSearch()
  const { indices } = useAutocomplete()

  useEffect(() => {
    if (!autocompleteContainer.current) {
      return;
    }

    const autocompleteInstance = autocomplete({
      ...autocompleteProps,
      container: autocompleteContainer.current,
      initialState: { query },
      onReset() {
        setInstantSearchUiState({ query: "" });
      },
      onSubmit({ state }) {
        setInstantSearchUiState({ query: state.query });
      },
      onStateChange({ prevState, state }) {
        if (prevState.query !== state.query) {
          setInstantSearchUiState({
            query: state.query
          });
        }
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

  return <div className={cn(className, "z-50")} ref={autocompleteContainer} />;
}
