import express from "express";
import cors from "cors";
import { config } from "dotenv";
import { createServer } from "http";
import { ensureSuperTokensInit, errorHandler, getKey, jwt, middleware, supertokens } from "@instapark/auth";
import contactsRouter from "./routes/contacts.route"
import { connect } from "mongoose";
import messageRouter from "./routes/message.route"
import { GLOBAL_CONFIG } from "@instapark/utils"
import { messageConsumer } from "@instapark/kafka";
import { handleConnection, handleDisconnection, handleOnMessage, handleOnRead } from "./socket/socket-actions";
import { Contact, Message } from "@instapark/types";
import { SocketBackend } from "./socket/socket-backend";

config();

async function init() {
    ensureSuperTokensInit();

    const app = express();

    app.use(express.json());

    app.use(express.urlencoded({ extended: true }));

    app.use(cors({
        origin: process.env.FRONTEND_URL,
        allowedHeaders: ["content-type", ...supertokens.getAllCORSHeaders()],
        methods: ["GET", "PUT", "POST", "DELETE", "OPTIONS"],
        credentials: true,
    }));

    app.use(middleware());

    try {
        connect("mongodb://localhost:27017/chat").then(() => {
            console.log("Connected to mongoDB successfully");
        })
    } catch (error) {
        throw error;
    }

    app.use("/contacts", contactsRouter);

    app.use("/messages", messageRouter);

    const server = createServer(app);

    const io = new SocketBackend().io

    io.attach(server);

    io.use(function (socket, next) {
        const token = socket.handshake.query?.token;
        if (typeof token === "string") {
            jwt.verify(token, getKey, {}, function (err, decoded) {
                if (err) return next(new Error("Authentication error"));
                socket.decoded = decoded;
                next();
            });
        } else {
            next(new Error("Authentication error"));
        }
    });

    io.on(GLOBAL_CONFIG.CHAT_SERVER.CONNECTION_EVENT, async (socket) => {

        await handleConnection(socket);

        socket.on(GLOBAL_CONFIG.CHAT_SERVER.MESSAGE_EVENT, async (message: Message) => {
            await handleOnMessage(message)
        });

        socket.on(GLOBAL_CONFIG.CHAT_SERVER.READ_EVENT, async (messages: Message[]) => await handleOnRead(messages, socket));

    });

    io.on(GLOBAL_CONFIG.CHAT_SERVER.DISCONNECTION_EVENT, async (socket) => await handleDisconnection(socket, io))

    app.get('/chat', (req, res) => {
        res.send('Chat Server is up and running');
    });

    app.use(errorHandler());

    server.listen(process.env.PORT, () => {
        console.log(`Server running on http://localhost:${process.env.PORT}`);
    });
    await messageConsumer({
        io,
        fromBeginning: false,
    });
}

init();

