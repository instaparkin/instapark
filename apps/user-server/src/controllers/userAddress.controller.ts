import { Request, Response } from "@instapark/utils";
import { userDb } from "../pg/user-pg-client";

export const upsertUserAddress = async (req: Request, res: Response) => {
    try {
        const { addressId, userId, country, state, city, pincode, street, name } = req.body;

        if (!addressId || !userId) {
            res.status(400).send({ error: "Missing required fields" });
            return;
        }

        const query = `
            INSERT INTO "UserAddress" ("addressId", "userId", "country", "state", "city", "pincode", "street", "name")
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
            ON CONFLICT ("addressId")
            DO UPDATE SET
                "country" = EXCLUDED."country",
                "state" = EXCLUDED."state",
                "city" = EXCLUDED."city",
                "pincode" = EXCLUDED."pincode",
                "street" = EXCLUDED."street",
                "name" = EXCLUDED."name";
        `;

        await userDb.query(query, [addressId, userId, country, state, city, pincode, street, name]);
        res.status(201).send({ message: "Address upserted successfully" });
    } catch (error) {
        res.status(500).send({ error: "Internal Server Error: " + error });
    }
};

export const getUserAddress = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;

        const query = `SELECT * FROM "UserAddress" WHERE "userId" = $1`;
        const response = await userDb.query(query, [userId]);

        if (response.rows.length === 0) {
            res.status(404).send({ error: "Address not found" });
            return;
        }

        res.status(200).send(response.rows[0]);
    } catch (error) {
        res.status(500).send({ error: "Internal Server Error: " + error });
    }
};

export const deleteUserAddress = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;

        const query = `DELETE FROM "UserAddress" WHERE "userId" = $1`;
        await userDb.query(query, [userId]);

        res.status(200).send({ message: "User Address deleted successfully" });
    } catch (error) {
        res.status(500).send({ error: "Internal Server Error: " + error });
    }
};
