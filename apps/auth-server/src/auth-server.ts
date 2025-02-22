import "dotenv/config"
import { errorHandler, middleware, supertokens, ensureSuperTokensInit, verifySession, SessionRequest } from "@instapark/auth";
import express from "express"
import cors from 'cors'
import { sendResponse } from "@instapark/utils";

async function init() {
    ensureSuperTokensInit();

    const app = express();

    app.use(express.json());

    app.use(cors({
        origin: "http://localhost:3000",
        allowedHeaders: ["content-type", ...supertokens.getAllCORSHeaders()],
        methods: ["GET", "PUT", "POST", "DELETE", "OPTIONS"],
        credentials: true,
    }));

    app.use(middleware());

    app.get(
        "/",
        (req, res) => {
            res.send("Auth Server is up and running");
        })

    app.get("/verify", verifySession(), (req: SessionRequest, res) => {
        try {
            const userId = req.session?.getUserId() ?? null;
            sendResponse(res, 200, "User Name added", "SUCCESS", { userId })
        } catch (error) {
            sendResponse(res, 500, "Internal server error", "FAILURE", error)
        }
    })

    app.use(errorHandler());

    const port = process.env.PORT

    app.listen(process.env.PORT, () => {
        console.log(`Server running on http://localhost:${port}`);
    });
}

init();