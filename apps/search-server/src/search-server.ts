import express from "express";
import cors from "cors";
import { config } from "dotenv";
import searchRoute from "./routes/search.route";
import kafkaRoute from "./routes/kafka.route";
import olaMapsRoute from "./routes/olamaps.route";
import { errorHandler, middleware, supertokens, ensureSuperTokensInit, verifySession, SessionRequest, Session } from "@instapark/auth";
import { consumeMessages } from "@instapark/kafka"
import { consumeMessage } from "@instapark/search";

config();

async function init() {

    ensureSuperTokensInit();

    const app = express();

    app.use(express.json());

    app.use(cors({
        origin: process.env.FRONTEND_URL,
        allowedHeaders: ["content-type", ...supertokens.getAllCORSHeaders()],
        methods: ["GET", "PUT", "POST", "DELETE", "OPTIONS"],
        credentials: true,
    }));

    app.use(middleware());

    app.get("/", (req, res) => {
        res.send("Search Server is up and running");
    })

    app.use("/search", searchRoute);

    app.use("/kafka", kafkaRoute);

    app.use("/olamaps", verifySession(), olaMapsRoute);

    app.use(errorHandler());

    consumeMessages({
        groupId: "listings-add-group",
        topics: ["listings-add-topic"],
        fromBeginning: true
    });

    app.listen(process.env.PORT, () => {
        console.log(`Server running on http://localhost:${process.env.PORT}`);
    })
}


init();