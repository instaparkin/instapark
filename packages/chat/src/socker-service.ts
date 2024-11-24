import { Server } from "socket.io";
import { Redis } from "ioredis";
import { createAdapter } from "@socket.io/redis-adapter";
import { nanoid } from "nanoid";
import { supertokens } from "@instapark/auth";
import { Session } from "@instapark/auth";

export class SocketService {
    private _io: Server;
    private _redis: Redis;

    constructor() {
        const pubClient = new Redis();
        const subClient = pubClient.duplicate();

        const io = new Server({
            adapter: createAdapter(pubClient, subClient),
            cors: {
                origin: process.env.FRONTEND_URL,
                allowedHeaders: ["content-type", ...supertokens.getAllCORSHeaders()],
                methods: ["GET", "POST", "OPTIONS"],
                credentials: true,
            },
        });

        this._io = io;
        this._redis = pubClient;
    }

    get io() {
        return this._io;
    }

    get redis() {
        return this._redis;
    }

    public start() {
        const io = this._io;

        io.on("connection", async (socket) => {
            console.log(`User connected: ${socket.id}`);

            // Notify the user of unseen messages
            const userId = await this.redis.get(socket.id);
            if (userId) {
                const unseenMessages = await this.redis.lrange(`messages:${userId}`, 0, -1);
                unseenMessages.forEach((message) => {
                    const parsedMessage = JSON.parse(message);
                    socket.emit("MESSAGE", parsedMessage);
                });
            }

            // Register user
            socket.on("REGISTER", async (userId: string) => {
                console.log(`User registered: ${userId} -> ${socket.id}`);
                await this.redis.set(socket.id, userId); // Map socket ID to user ID
                await this.redis.sadd(userId, socket.id); // Map user ID to socket IDs
            });

            // Handle sending messages
            socket.on("MESSAGE", async ({ receiver, message }) => {
                const senderId = await this.redis.get(socket.id);
                if (!senderId) {
                    socket.emit("error", { message: "You must register first." });
                    return;
                }

                const messageId = nanoid();
                const timestamp = new Date().toISOString();
                const messageData = {
                    id: messageId,
                    sender: senderId,
                    receiver,
                    content: message,
                    status: "sent",
                    timestamp,
                };

                // Store the message for the receiver
                await this.redis.rpush(`messages:${receiver}`, JSON.stringify(messageData));
                await this.redis.set(`message_status:${messageId}`, "sent");

                const receiverSocketIds = await this.redis.smembers(receiver);
                if (receiverSocketIds.length > 0) {
                    receiverSocketIds.forEach((id) => {
                        io.to(id).emit("MESSAGE", messageData);
                    });

                    // Update status to "delivered"
                    messageData.status = "delivered";
                    await this.redis.set(`message_status:${messageId}`, "delivered");
                }

                // Notify the sender of the "sent" status
                socket.emit("MESSAGE_STATUS", { ...messageData, status: "sent" });
            });

            // Handle message seen
            socket.on("MESSAGE_SEEN", async (messageId) => {
                const receiverId = await this.redis.get(socket.id);
                if (!receiverId) {
                    socket.emit("error", { message: "You must register first." });
                    return;
                }

                // Update status to "seen"
                await this.redis.set(`message_status:${messageId}`, "seen");

                // Notify the sender
                const messageData = JSON.parse(await this.redis.get(`message:${messageId}`) as string);
                const senderSocketIds = await this.redis.smembers(messageData.sender);
                senderSocketIds.forEach((id) => {
                    io.to(id).emit("MESSAGE_STATUS", { ...messageData, status: "seen" });
                });

                // Remove the message from unseen list
                await this.redis.lrem(`messages:${receiverId}`, 0, JSON.stringify(messageData));
            });

            // Handle disconnection
            socket.on("disconnect", async () => {
                console.log(`User disconnected: ${socket.id}`);
                const userId = await this.redis.get(socket.id);
                if (userId) {
                    await this.redis.srem(userId, socket.id); // Remove socket ID from user mapping
                    await this.redis.del(socket.id); // Remove socket ID to user mapping
                }
            });
        });
    }
}
