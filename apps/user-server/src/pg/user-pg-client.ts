import { Client } from "pg"

export const userDb = new Client({
    host : "localhost",
    port : 5433,
    user: "postgres",
    password: "901920",
    database: "instapark-user",
})