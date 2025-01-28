export const BOOKINGS_SERVER_CONSTANTS = {
    MONGODB: {
        URI: "mongodb://localhost:27017/bookings"
    },
    CASHFREE: {
        CASHFREE_CLIENT_ID: process.env.CASHFREE_CLIENT_ID as string,
        CASHFREE_CLIENT_SECRET: process.env.CASHFREE_CLIENT_SECRET as string
    }
}