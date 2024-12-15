import express from "express";
import cors from "cors";
import { config } from "dotenv";
import { errorHandler, middleware, supertokens, ensureSuperTokensInit, verifySession } from "@instapark/auth";
import geocoder from "./routers/geocoder";
import reverseGeocoder from "./routers/reverse-geocoder";
import routeFinder from "./routers/route-finder";

config();

async function init() {

    ensureSuperTokensInit();

    const app = express();

    app.use(cors({
        origin: process.env.FRONTEND_URL,
        allowedHeaders: ["content-type", ...supertokens.getAllCORSHeaders()],
        methods: ["GET", "PUT", "POST", "DELETE", "OPTIONS"],
        credentials: true,
    }));

    app.use(middleware());

    app.use(express.json());

    app.use((req, res, next) => {
        console.log(`Request received at ${req.url}`);
        next();
    });    

    app.get("/maps", (req, res) => {
        res.send("Map Server is up and running");
    })

    app.use("/maps/geocoder", verifySession(), geocoder);

    app.use("/maps/reverse", verifySession(), reverseGeocoder);

    app.use("/maps/route-finder", verifySession(), routeFinder);

    app.use(errorHandler());

    app.listen(process.env.PORT, () => {
        console.log(`Server running on http://localhost:${process.env.PORT}`);
    })
}

init();