import express from "express";
import cors from "cors";
import { config } from "dotenv";
import { userDb } from "./pg/user-pg-client";
import profileRouter from "./routes/profile.route";
import { errorHandler, middleware, supertokens, ensureSuperTokensInit, verifySession, SessionRequest } from "@instapark/auth";

config();

async function init() {
    ensureSuperTokensInit();

    const app = express();

    app.use(express.json());

    app.use(cors({
        origin: process.env.FRONTEND_URL,
        methods: ["GET", "PUT", "POST", "DELETE"],
        credentials: true,
    }));

    app.use(middleware());

    await userDb.connect();

    app.use("/profile", profileRouter);

    app.use(errorHandler());

    app.listen(process.env.PORT, () => {
        console.log(`Server running on http://localhost:${process.env.PORT}`);
    })
}

init()