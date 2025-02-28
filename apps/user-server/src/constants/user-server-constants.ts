export const USER_SERVER_CONSTANTS = {
    MONGODB: {
        URI: "mongodb://localhost:27017/instapark-user"
    },
    CASHFREE: {
        CASHFREE_SECURE_CLIENT_ID: process.env.CASHFREE_SECURE_CLIENT_ID!,
        CASHFREE_SECURE_CLIENT_SECRET: process.env.CASHFREE_SECURE_CLIENT_SECRET!
    }
}