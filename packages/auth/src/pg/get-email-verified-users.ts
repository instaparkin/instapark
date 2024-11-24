import { pgClient } from "./pg-client";

export async function getEmailVerifiedUsers() {
    try {
        await pgClient.connect();
        const res = await pgClient.query('SELECT * FROM emailverification_verified_emails');
        console.log(res.rows);
        return res;
    } catch (error) {
        console.log(error);
    } finally {
        await pgClient.end();
    }
}