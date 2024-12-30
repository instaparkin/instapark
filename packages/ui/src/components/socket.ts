import { io, Socket } from "socket.io-client";
import { getAccessToken } from "@instapark/auth";
import uiConfig from "../../ui-config.json";

let socket: Socket | null = null;

export async function initSocketConnection() {
    if (!socket) {
        const token = await getAccessToken();
        if (!token) throw new Error("User is not logged in");
        socket = io(uiConfig.CHAT_SERVER_URL, {
            query: { token },
            transports: ["websocket"],
            autoConnect: false,
        });
        socket.connect();
    }
    return socket;
}
