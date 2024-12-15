import express from "express";
import cors from "cors";
import { config } from "dotenv";
import { errorHandler, middleware, supertokens, ensureSuperTokensInit } from "@instapark/auth";
import listingsRouter from "./routers/listings-router";
import { uploadthingExpress } from "@instapark/listings";

config();

async function init() {

    ensureSuperTokensInit()

    const app = express();

    app.use(cors({
        origin: process.env.FRONTEND_URL,
        allowedHeaders: ["content-type", ...supertokens.getAllCORSHeaders(), "x-uploadthing-package", "x-uploadthing-version"],
        methods: ["GET", "PUT", "POST", "DELETE", "OPTIONS"],
        credentials: true,
    }));

    app.use(middleware());

    app.use(express.json());

    app.use("/listings", listingsRouter);

    app.use("/listings/uploadthing", uploadthingExpress)

    app.use(errorHandler());

    app.listen(process.env.PORT, () => {
        console.log(`Server running on http://localhost:${process.env.PORT}`);
    })
}

init();