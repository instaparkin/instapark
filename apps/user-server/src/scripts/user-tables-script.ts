import fs from "fs";
import { userDb } from "../pg/user-pg-client";
import path from "path";

const FILE_PATH = path.join(__dirname, "../pg/user-schema.sql");

async function updateUserTables() {
    console.log("Starting updateUserTables...");
    try {
        const sql = fs.readFileSync(FILE_PATH, "utf8");
        const res = await userDb.query(sql);
        console.log("User Db updated successfully:", res);
    } catch (error) {
        console.error("Error reading SQL file:", error);
        return;
    }
}

updateUserTables();
