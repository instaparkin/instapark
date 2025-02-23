export const API_SERVER_CONSTANTS = {
    CASHFREE: {
        CASHFREE_API_VERSION: '2023-08-01',
        CASHFREE_CLIENT_ID: 'TEST10180324795c6ed369800e535fc242308101',
        CASHFREE_CLIENT_SECRET: 'cfsk_ma_test_ea216f531ab789cd1bb6c0d98bf6f4a6_179a58b2',
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