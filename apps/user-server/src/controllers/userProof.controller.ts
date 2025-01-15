import { Request, Response } from "@instapark/utils";
import { userDb } from "../pg/user-pg-client";

export const upsertUserProof = async (req: Request, res: Response) => {
    try {
        const { userId, government_Id, frontside_url, backside_url } = req.body;

        if (!userId || !government_Id || !frontside_url || !backside_url) {
            res.status(400).send({ error: "Missing required fields" });
            return;
        }

        const query = `
            INSERT INTO "UserProof" ("userId", "government_Id", "frontside_url", "backside_url")
            VALUES ($1, $2, $3, $4)
            ON CONFLICT ("government_Id")
            DO UPDATE SET 
                "frontside_url" = EXCLUDED."frontside_url",
                "backside_url" = EXCLUDED."backside_url";
        `;

        const values = [userId, government_Id, frontside_url, backside_url];
        await userDb.query(query, values);

        res.status(201).send({ message: "User proof record upserted successfully" });
    } catch (error) {
        res.status(500).send({ error: "Internal Server Error: " + error });
    }
};

export const getUserProof = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;

        const query = `SELECT * FROM "UserProof" WHERE "userId" = $1`;

        const response = await userDb.query(query, [userId]);

        if (response.rows.length === 0) {
            res.status(404).send({ error: "Proof not found" });
            return;
        }

        res.status(200).send(response.rows[0]);
    } catch (error) {
        res.status(500).send({ error: "Internal Server Error: " + error });
    }
};

export const deleteUserProof = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;

        const query = `DELETE FROM "UserProof" WHERE "userId" = $1`;
        await userDb.query(query, [userId]);

        res.status(200).send({ message: "User proof deleted successfully" });
    } catch (error) {
        res.status(500).send({ error: "Internal Server Error: " + error });
    }
};
