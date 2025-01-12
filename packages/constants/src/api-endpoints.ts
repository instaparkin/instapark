export const API_ENDPOINTS = {
    CHAT_SERVER: {

    },
    USER_SERVER: {
        PROFILE: {
            NAME: "/profile",
            ROUTES: {
                FULLNAME: {
                    UPSERT: "/fullname/upsert",
                    GET: "/fullname/get/:userId"
                }
            }
        }
    },
    LISTINGS_SERVER: {

    },
    AUTH_SERVER: {

    },
    BOOKINGS_SERVER: {

    },
    PAYMENTS_SERVER: {

    },
    SEARCH_SERVER: {

    }
}