import { Client } from "pg"

export const pgClient = new Client({
    host: "localhost",
    port: 5432,
    user: "postgres",
    password: "901920",
    database: "instapark-supertokens",
})

export async function getTenants() {
    try {
        await pgClient.connect();
        const res = await pgClient.query('SELECT * FROM tenants');
        console.log(res.rows);
        return res.rows
    } catch (err) {
        console.error(err);
    } finally {
        await pgClient.end();
    }
}