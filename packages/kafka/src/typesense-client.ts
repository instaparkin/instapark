import { Client } from "typesense";

export const typesenseClient = new Client({
    'nodes': [{
        'host': 'localhost',
        'port': 8108,
        'protocol': 'http',
        path: '/'
    }],
    'apiKey': 'xyz',
    'connectionTimeoutSeconds':  10
})
