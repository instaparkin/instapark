import express from "express";
import cors from "cors";
import { config } from "dotenv";
import { userDb } from "./pg/user-pg-client";
import profileRouter from "./routes/profile.route";

config();

async function init() {
    const app = express();

    app.use(cors({
        origin: process.env.FRONTEND_URL,
        methods: ["GET", "PUT", "POST", "DELETE"],
        credentials: true,
    }));

    app.use(express.json());

    await userDb.connect();

    app.use("/profile", profileRouter);

    app.listen(process.env.PORT, () => {
        console.log(`Server running on http://localhost:${process.env.PORT}`);
    })
}

init()