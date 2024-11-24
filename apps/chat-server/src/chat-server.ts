import express from "express";
import cors from "cors";
import { config } from "dotenv";
import { createServer } from "http";
import { SocketService } from "@instapark/chat";
import { ensureSuperTokensInit, errorHandler, middleware, supertokens } from "@instapark/auth";

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

    const server = createServer(app);

    const ws = new SocketService();

    ws.io.attach(server);

    app.use(express.json());

    app.get('/chat', (req, res) => {
        res.send('Chat Server is up and running');
    });

    server.listen(process.env.PORT, () => {
        console.log(`Server running on http://localhost:${process.env.PORT}`);
    })

    app.use(errorHandler());

    ws.start();
}

init()