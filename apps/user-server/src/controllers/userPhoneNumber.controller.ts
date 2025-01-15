import { Request, Response } from "@instapark/utils";
import { userDb } from "../pg/user-pg-client";

export const addPhoneNumber = async (req: Request, res: Response) => {
    try {
        const { userId, phoneNumber } = req.body;

        if (!userId || !phoneNumber) {
            res.status(400).send({ error: "Missing required fields" });
            return;
        }

        const query = `
            INSERT INTO "UserPhoneNumbers" ("userId", "phoneNumber")
            VALUES ($1, $2)
            ON CONFLICT DO NOTHING;
        `;

        await userDb.query(query, [userId, phoneNumber]);
        res.status(201).send({ message: "Phone number added successfully" });
    } catch (error) {
        res.status(500).send({ error: "Internal Server Error: " + error });
    }
};

export const getPhoneNumbers = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;

        const query = `SELECT * FROM "UserPhoneNumbers" WHERE "userId" = $1`;
        const response = await userDb.query(query, [userId]);

        res.status(200).send(response.rows);
    } catch (error) {
        res.status(500).send({ error: "Internal Server Error: " + error });
    }
};

export const deletePhoneNumber = async (req: Request, res: Response) => {
    try {
        const { userId, phoneNumber } = req.body;

        const query = `
            DELETE FROM "UserPhoneNumbers"
            WHERE "userId" = $1 AND "phoneNumber" = $2;
        `;

        const response = await userDb.query(query, [userId, phoneNumber]);

        if (response.rowCount === 0) {
            res.status(404).send({ error: "Phone number not found" });
            return;
        }

        res.status(200).send({ message: "Phone number deleted successfully" });
    } catch (error) {
        res.status(500).send({ error: "Internal Server Error: " + error });
    }
};
