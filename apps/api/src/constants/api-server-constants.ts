export const API_SERVER_CONSTANTS = {
    CASHFREE: {
        CASHFREE_API_VERSION: process.env.CASHFREE_API_VERSION!,
        CASHFREE_CLIENT_ID: process.env.CASHFREE_CLIENT_ID!,
        CASHFREE_CLIENT_SECRET: process.env.CASHFREE_CLIENT_SECRET!,
    },
    SERVERS: {
        AUTH_SERVER_URL: process.env.AUTH_SERVER_URL,
        BOOKINGS_SERVER_URL: process.env.BOOKINGS_SERVER_URL,
        LISTINGS_SERVER_URL: process.env.LISTINGS_SERVER_URL,
        USER_SERVER_URL: process.env.USER_SERVER_URL,
    },
    ENDPOINTS: {
        LISTINGS: {
            LISTING: {
                CREATE: `${process.env.LISTINGS_SERVER_URL}/listings`,
                UPDATE: `${process.env.LISTINGS_SERVER_URL}/listings`,
                GET: `${process.env.LISTINGS_SERVER_URL}/listings`,
            },
            REVIEW: {
                GET: `${process.env.LISTINGS_SERVER_URL}/reviews`,
            }
        },
        BOOKINGS: {
            BOOKING: {
                GET: `${process.env.BOOKINGS_SERVER_URL}/bookings`,
                EARNING_STATS: `${process.env.BOOKINGS_SERVER_URL}/bookings/earnings-stats`,
                OTP: `${process.env.BOOKINGS_SERVER_URL}/bookings/otp`,
                LOCK: `${process.env.BOOKINGS_SERVER_URL}/bookings/lock`,
                BOOK: `${process.env.BOOKINGS_SERVER_URL}/bookings/book`,
                VERIFY: `${process.env.BOOKINGS_SERVER_URL}/bookings/otp/verify`,
                COMPLETE: `${process.env.BOOKINGS_SERVER_URL}/bookings/complete`,
                COMPLETE_ORDER: `${process.env.BOOKINGS_SERVER_URL}/bookings/complete/order`,
            },
            VENDOR: {
                BALANCE: `${process.env.BOOKINGS_SERVER_URL}/vendor/balance`,
                GET: `${process.env.BOOKINGS_SERVER_URL}/vendor`,
                CREATE: `${process.env.BOOKINGS_SERVER_URL}/vendor`,
            },
            PAYMENTS: {
                GET: `${process.env.BOOKINGS_SERVER_URL}/payments`,
            },
            SETTLEMENTS: {
                GET: `${process.env.BOOKINGS_SERVER_URL}/settlements`,
            },
        },
        USER: {
            PROFILE: {
                GET: `${process.env.USER_SERVER_URL}/profile`,
                UPSERT: `${process.env.USER_SERVER_URL}/profile`,
            },
            AADHAR: {
                OTP: `${process.env.USER_SERVER_URL}/aadhar/otp`,
                VERIFY: `${process.env.USER_SERVER_URL}/aadhar/verify`,
            }
        },
    }
}