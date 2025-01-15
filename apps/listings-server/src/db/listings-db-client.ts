import { LISTINGS_SERVER_CONSTANTS } from "../constants/listings-server-constants"
import { Client } from "@instapark/utils";

export const listingsDb = new Client({
    host: LISTINGS_SERVER_CONSTANTS.DB.HOST,
    port: LISTINGS_SERVER_CONSTANTS.DB.PORT,
    user: LISTINGS_SERVER_CONSTANTS.DB.USER,
    password: LISTINGS_SERVER_CONSTANTS.DB.PASSWORD,
    database: LISTINGS_SERVER_CONSTANTS.DB.DATABASE,
})