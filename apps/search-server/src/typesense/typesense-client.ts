import { Client } from "typesense";
import { SEARCH_SERVER_CONSTANTS } from "../constants/search-server-constants";

export const typesenseClient = new Client({
    'nodes': [{
        'host': SEARCH_SERVER_CONSTANTS.TYPESENSE.HOST,
        'port': SEARCH_SERVER_CONSTANTS.TYPESENSE.PORT,
        'protocol': SEARCH_SERVER_CONSTANTS.TYPESENSE.PROTOCOL,
        path: SEARCH_SERVER_CONSTANTS.TYPESENSE.PATH
    }],
    'apiKey': SEARCH_SERVER_CONSTANTS.TYPESENSE.API_KEY,
    'connectionTimeoutSeconds': SEARCH_SERVER_CONSTANTS.TYPESENSE.CONNECTION_TIMEOUT_SECONDS
})