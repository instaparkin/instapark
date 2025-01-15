import { Client } from "@instapark/utils";
import { USER_SERVER_CONSTANTS } from "../constants/user-server-constants";

export const userDb = new Client({
    host: USER_SERVER_CONSTANTS.DB.HOST,
    port: USER_SERVER_CONSTANTS.DB.PORT,
    user: USER_SERVER_CONSTANTS.DB.USER,
    password: USER_SERVER_CONSTANTS.DB.PASSWORD,
    database: USER_SERVER_CONSTANTS.DB.DATABASE,
})