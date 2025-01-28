import "@dotenvx/dotenvx/config"
import { errorHandler, middleware, supertokens, ensureSuperTokensInit, verifySession } from "@instapark/auth";
import { API_ENDPOINTS } from "@instapark/constants";
import metadataRouter from "./routes/metadata.route";
import express from "express"
import cors from 'cors'

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

    app.get(
        API_ENDPOINTS.AUTH_SERVER.PREFIX,
        (req, res) => {
            res.send("Auth Server is up and running");
        })

    app.use("/auth/metadata", verifySession(), metadataRouter)

    app.use(errorHandler());

    const port = process.env.PORT

    app.listen(process.env.PORT, () => {
        console.log(`Server running on http://localhost:${port}`);
    });
}

init();