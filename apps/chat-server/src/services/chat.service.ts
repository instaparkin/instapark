import { SocketService } from "./socket.service";
import { IncomingMessage, Server, ServerResponse } from "http";

export class ChatService extends SocketService {

    constructor(httpServer: Server<typeof IncomingMessage, typeof ServerResponse>) {
        super(httpServer);
    }

    private sendMessage() {
        this.io?.on("", () => {

        })
    }

    private receiveMessage() {
    }

}