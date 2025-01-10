import express from "express";
import cors from "cors";
import { config } from "dotenv";
import { errorHandler, middleware, supertokens, ensureSuperTokensInit, verifySession } from "@instapark/auth";
import listingsRouter from "./routes/listings.router";
import { uploadthingExpress } from "@instapark/listings"
import redisRouter from "./routes/redis.router";

config();

async function init() {

    ensureSuperTokensInit();

    const app = express();
    
    app.use(express.json());
    
    app.use(cors({
        origin: [process.env.FRONTEND_URL!],
        allowedHeaders: ["content-type", ...supertokens.getAllCORSHeaders(), "x-uploadthing-package", "x-uploadthing-version"],
        methods: ["GET", "PUT", "POST", "DELETE", "OPTIONS"],
        credentials: true,
    }));
    
    app.use(middleware());
    
    app.get("/listings", (req, res) => {
        res.send("Listings server is up and Running")
    })

    app.use("/listings", listingsRouter);
    
    app.use("/listings/uploadthing", uploadthingExpress);

    app.use("/listings/redis", redisRouter)

    app.use(errorHandler());

    app.listen(process.env.PORT, () => {
        console.log(`Server running on http://localhost:${process.env.PORT}`);
    })
}

init();