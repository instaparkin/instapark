"use client"

import TypesenseInstantSearchAdapter from "typesense-instantsearch-adapter";

const typesenseInstantsearchAdapter = new TypesenseInstantSearchAdapter({
  server: {
    apiKey: "xyz",
    additionalHeaders: {
      "withCredentials" : "false"
    },
    nodes: [
      {
        host: "localhost",
        port: 8080,
        protocol: "http",
        path: "/search",
      }
    ]
  },
  additionalSearchParameters: {
    query_by: "location_state"
  }
});

export const typesenseSearchClient = typesenseInstantsearchAdapter.searchClient;
