import { Request, Response } from "express";
import { userDb } from "../pg/user-pg-client";

export const upsertFullname = async (req: Request, res: Response) => {
    try {
        const { userId, firstname, lastname } = req.body;

        console.log(req.body);


        if (!userId || !firstname || !lastname) {
            res.status(400).send({ error: "Missing required fields" });
            return;
        }

        const query = `
            INSERT INTO users (userId, firstname, lastname)
            VALUES ($1, $2, $3)
            ON CONFLICT (userId) 
            DO UPDATE SET
                firstname = EXCLUDED.firstname,
                lastname = EXCLUDED.lastname;
        `;

        const values = [userId, firstname, lastname];

        const response = await userDb.query(query, values);
        res.status(201).send({ message: "User record upserted successfully", data: response });
    } catch (error) {
        res.status(500).send({ error: "Internal Server Error" });
    }
};


export const getFullname = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;

        if (!userId) {
            res.status(400).send({ error: "UserId is required" });
            return;
        }

        const query = `
            SELECT *
            FROM users
            WHERE userId = $1
        `;

        const values = [userId];

        const response = await userDb.query(query, values);

        const { firstname, lastname } = response.rows[0]

        const fullname = `${firstname} ${lastname}`;

        if (response.rows.length === 0) {
            res.status(404).send({ error: "User not found" });
            return;
        }

        res.status(200).send({
            fullname,
            firstname,
            lastname
        });
    } catch (error) {
        res.status(500).send({ error: "Internal Server Error" });
    }
};
