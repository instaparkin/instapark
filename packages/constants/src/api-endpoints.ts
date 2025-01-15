export const API_ENDPOINTS = {
    USER_SERVER: {
        URL: "http://localhost:8080/user",
        PREFIX: "/user",
        ROUTES: {
            USER_NAME: {
                PREFIX: "/user-name",
                UPSERT: "/upsert",
                GET: "/get/:userId",
                DELETE: "/delete/:userId",
            },
            USER_ADDRESS: {
                PREFIX: "/user-address",
                UPSERT: "/upsert",
                GET: "/get/:userId",
                DELETE: "/delete/:userId",
            }
        }
    },

    LISTINGS_SERVER: {
        URL: "http://localhost:8080/listings",
        PREFIX: "/listings",
        ROUTES: {
            LISTING: {
                PREFIX: "/listings",
                UPSERT: "/upsert",
                GET: "/get/:listingId",
                DELETE: "/delete/:listingId"
            },
            KAFKA: {
                PREFIX: "/listings/kafka"
            },
            UPLOADTHING: {
                PREFIX: "/listings/uploadthing"
            },
            REDIS: {
                PREFIX: "/listings/redis",
                SET: "/set",
                GET: "/get/:key",
                DEL: "/del/:key"
            }
        }
    },
    AUTH_SERVER: {
        URL: "http://localhost:8080/auth",
        PREFIX: "/auth"
    },
    BOOKINGS_SERVER: {
        URL: "http://localhost:8080/bookings",
        PREFIX: "/bookings",
        ROUTES: {

        }
    },
    PAYMENTS_SERVER: {
        URL: "http://localhost:8080/payments",
        PREFIX: "/payments"
    },
    SEARCH_SERVER: {
        URL: "http://localhost:8080/search",
        PREFIX: "/search",
        ROUTES: {
            SEARCH: {
                PREFIX: "/search"
            },
            TYPESENSE: {
                PREFIX: "/search/typesense"
            },
            OLAMAPS: {
                PREFIX: "/search/olamaps",
                AUTOCOMPLETE: "/autocomplete/:q",
                GEOCODE: "/geocode/:q",
                REVERSE_GEOCODE: "/reverse-geocode/:latlng",
                DIRECTIONS: "/directions/:origin/:destination"
            }
        }
    }
}