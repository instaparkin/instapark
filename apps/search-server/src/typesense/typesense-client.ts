import { Client } from "typesense";
import { SEARCH_SERVER_CONSTANTS } from "@instapark/constants";

export const typesenseClient = new Client({
    'nodes': [{
        'host': SEARCH_SERVER_CONSTANTS.typesenseClient.host,
        'port': SEARCH_SERVER_CONSTANTS.typesenseClient.port,
        'protocol': SEARCH_SERVER_CONSTANTS.typesenseClient.protocol,
        path: SEARCH_SERVER_CONSTANTS.typesenseClient.path
    }],
    'apiKey': SEARCH_SERVER_CONSTANTS.typesenseClient.apiKey,
    'connectionTimeoutSeconds': SEARCH_SERVER_CONSTANTS.typesenseClient.connectionTimeoutSeconds
})