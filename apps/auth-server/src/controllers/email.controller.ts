import { authDb } from "../db/auth-db-client";

export async function getEmailVerifiedUsers() {
    try {
        const res = await authDb.query('SELECT * FROM emailverification_verified_emails');
        console.log(res.rows);
        return res;
    } catch (error) {
        console.log(error);
    } finally {
        await authDb.end();
    }
}