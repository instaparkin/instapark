export const API_SERVER_CONSTANTS = {
    CASHFREE: {
        CASHFREE_API_VERSION: process.env.CASHFREE_API_VERSION,
        CASHFREE_CLIENT_ID: process.env.CASHFREE_CLIENT_ID,
        CASHFREE_CLIENT_SECRET: process.env.CASHFREE_CLIENT_SECRET,
    },
    SERVERS: {
        AUTH_SERVER_URL: process.env.AUTH_SERVER_URL,
        BOOKINGS_SERVER_URL: process.env.BOOKINGS_SERVER_URL,
        LISTINGS_SERVER_URL: process.env.LISTINGS_SERVER_URL,
        USER_SERVER_URL: process.env.USER_SERVER_URL,
    },
    ENDPOINTS: {
        LISTINGS: {
            CREATE: `${process.env.LISTINGS_SERVER_URL}/listings`,
            UPDATE: `${process.env.LISTINGS_SERVER_URL}/listings`,
            GET: `${process.env.LISTINGS_SERVER_URL}/listings`,
        },
        BOOKINGS: {
            BOOKING: {
                EARNING_STATS: `${process.env.BOOKINGS_SERVER_URL}/bookings/earnings-stats`
            },
            VENDOR: {
                BALANCE: `${process.env.BOOKINGS_SERVER_URL}/vendor/balance`,
                GET: `${process.env.BOOKINGS_SERVER_URL}/vendor`,
            }
        },
        USER: {
            PROFILE: {
                GET: `${process.env.USER_SERVER_URL}/profile`,
                UPSERT: `${process.env.USER_SERVER_URL}/profile`,
            }
        },
        AUTH: {

        }
    }
}