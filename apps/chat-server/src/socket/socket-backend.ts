import { supertokens } from "@instapark/auth";
import { Server } from "socket.io";

export class SocketBackend {
    private _io: Server;
    constructor() {
        const io = new Server({
            cors: {
                origin: process.env.FRONTEND_URL,
                allowedHeaders: ["content-type", ...supertokens.getAllCORSHeaders()],
                methods: ["GET", "PUT", "POST", "DELETE", "OPTIONS"],
                credentials: true,
            }
        });
        this._io = io;
    }

    get io() {
        return this._io
    }
}