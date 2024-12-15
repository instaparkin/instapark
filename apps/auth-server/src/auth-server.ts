import express from "express";
import cors from "cors";
import { config } from "dotenv";
import { errorHandler, middleware, supertokens, ensureSuperTokensInit, verifySession, SessionRequest, Session } from "@instapark/auth";

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

    app.get("/auth", (req, res) => {
        res.send("Auth Server is up and running");
    })

    app.get("/auth/sessioninfo", verifySession(), async (req: SessionRequest, res) => {
        const session = req.session;
        res.send({
            sessionHandle: session!.getHandle(),
            userId: session!.getUserId(),
            accessTokenPayload: session!.getAccessTokenPayload(),
        });
    });

    app.get("/auth/userdetails", verifySession(), async (req: SessionRequest, res) => {
        const session = await req.session
        const info = await supertokens.getUser(session?.getUserId() as string)
        let accessTokenPayload = await session?.getAccessTokenPayload();
        let customClaimValue = await accessTokenPayload.customClaim
        res.send(info)
    })

    app.use(errorHandler());

    app.listen(process.env.PORT, () => {
        console.log(`Server running on http://localhost:${process.env.PORT}`);
    });
}

init();