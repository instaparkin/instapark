import { Request, Response } from "express";
import { userDb } from "../pg/user-pg-client";

export const upsertFullname = async (req: Request, res: Response) => {
    try {
        const { userId, fullname, lastname } = req.body;

        console.log(req.body);
        

        if (!userId || !fullname || !lastname) {
            res.status(400).send({ error: "Missing required fields" });
            return;
        }

        const query = `
            INSERT INTO users (userId, firstname, lastname)
            VALUES ($1, $2, $3)
            ON CONFLICT (userId) 
            DO UPDATE SET
                firstName = EXCLUDED.firstName,
                lastName = EXCLUDED.lastName;
        `;

        const values = [userId, fullname, lastname];

        const response = await userDb.query(query, values);
        console.log(response);
        res.status(201).send({ message: "User record upserted successfully", data: response });
    } catch (error) {
        console.error("Error in upsertFullname:", error);
        res.status(500).send({ error: "Internal Server Error" });
    }
};
