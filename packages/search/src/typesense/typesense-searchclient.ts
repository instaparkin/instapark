"use client"

import TypesenseInstantSearchAdapter from "typesense-instantsearch-adapter";

const typesenseInstantsearchAdapter = new TypesenseInstantSearchAdapter({
  server: {
    apiKey: "xyz",
    nodes: [
      {
        host: "localhost",
        port: 8108,
        protocol: "http",
        path: "/"
      }
    ]
  },
  additionalSearchParameters: {
    query_by: "*"
  }
});

export const typesenseSearchClient = typesenseInstantsearchAdapter.searchClient;
