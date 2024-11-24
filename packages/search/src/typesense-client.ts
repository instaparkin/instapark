import { Client } from "typesense";

export const typesenseClient = new Client({
    'nodes': [{
        'host': 'localhost',
        'port': 8108,
        'protocol': 'http',
    }],
    'apiKey': 'xyz',
    'connectionTimeoutSeconds': 2
})
