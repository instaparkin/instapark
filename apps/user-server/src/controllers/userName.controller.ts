import { Request, Response } from "@instapark/utils";
import { userDb } from "../pg/user-pg-client";

export const upsertUserName = async (req: Request, res: Response) => {
    try {
        const { userId, firstName, lastName, preferred_name } = req.body;

        if (!userId || !firstName || !lastName) {
            res.status(400).send({ error: "Missing required fields" });
            return;
        }

        const query = `
            INSERT INTO "UserName" ("userId", "firstName", "lastName", "preferred_name")
            VALUES ($1, $2, $3, $4)
            ON CONFLICT ("userId") 
            DO UPDATE SET 
                "firstName" = EXCLUDED."firstName",
                "lastName" = EXCLUDED."lastName",
                "preferred_name" = EXCLUDED."preferred_name";
        `;

        const values = [userId, firstName, lastName, preferred_name];
        await userDb.query(query, values);

        res.status(201).send({ message: "User record upserted successfully" });
    } catch (error) {
        res.status(500).send({ error: "Internal Server Error: " + error });
    }
};

export const getUserName = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;

        const query = `SELECT * FROM "UserName" WHERE "userId" = $1`;
        const response = await userDb.query(query, [userId]);

        if (response.rows.length === 0) {
            res.status(404).send({ error: "User not found" });
            return;
        }

        res.status(200).send(response.rows[0]);
    } catch (error) {
        res.status(500).send({ error: "Internal Server Error: " + error });
    }
};

export const deleteUserName = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;

        const query = `DELETE FROM "UserName" WHERE "userId" = $1`;
        await userDb.query(query, [userId]);

        res.status(200).send({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).send({ error: "Internal Server Error: " + error });
    }
};
