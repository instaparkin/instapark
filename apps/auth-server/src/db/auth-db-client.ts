import { Client } from "@instapark/utils";
import { AUTH_SERVER_CONSTANTS } from "../constants/auth-server-constants";

export const authDb = new Client({
    host: AUTH_SERVER_CONSTANTS.DB.HOST,
    port: AUTH_SERVER_CONSTANTS.DB.PORT,
    user: AUTH_SERVER_CONSTANTS.DB.USER,
    password: AUTH_SERVER_CONSTANTS.DB.PASSWORD,
    database: AUTH_SERVER_CONSTANTS.DB.DATABASE,
})