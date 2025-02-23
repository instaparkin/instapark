export const API_ENDPOINTS = {
    USER_SERVER: {
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
        PREFIX: "/listings",
        ROUTES: {
            LISTING: {
                PREFIX: "/listings",
                CREATE: "/",
                UPDATE: "/:id",
                DELETE: "/:id",
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
            BOOKINGS : {
                PREFIX : "/bookings",
                LOCK : "/lock",
                CREATE : "/create",
                COMPLETE : "/complete"
            }
        }
    },
}