import { IncomingMessage, Server, ServerResponse } from "http";
import { Server as SocketServer } from "socket.io";

export class SocketService {
    private _io: SocketServer | null = null

    constructor(httpServer: Server<typeof IncomingMessage, typeof ServerResponse>) {
        this._io = new SocketServer(httpServer)
    }

    get io() {
        return this._io;
    }
}