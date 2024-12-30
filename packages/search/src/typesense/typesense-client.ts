import { Client } from "typesense";
import searchConfig from "../../search-config.json";

export const typesenseClient = new Client({
    'nodes': [{
        'host': searchConfig.typesenseClient.host,
        'port': searchConfig.typesenseClient.port,
        'protocol': searchConfig.typesenseClient.protocol,
        path: searchConfig.typesenseClient.path
    }],
    'apiKey': searchConfig.typesenseClient.apiKey,
    'connectionTimeoutSeconds': searchConfig.typesenseClient.connectionTimeoutSeconds
})