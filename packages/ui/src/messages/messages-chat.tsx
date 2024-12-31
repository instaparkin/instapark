'use client';

import { useEffect, useState } from "react";
import { Avatar, AvatarFallback } from "../components/avatar";
import { Button } from "../components/button";
import { Input } from "../components/input";
import { Send } from 'lucide-react';
import { useSessionContext } from "@instapark/auth";
import { initSocketConnection } from "../components/socket";
import { MessagesSidebar } from "./messages-sidebar";
import { Page } from "../components/page";
import { GLOBAL_CONFIG } from "@instapark/utils";
import { Socket } from "socket.io-client";
import { MessagesScroll } from "./messages-scroll"
import { Message } from "@instapark/types";

interface MessagesChatProps {
    receiverId: string;
}

interface OnlineStatus {
    userId: string
    status: boolean
}

export function MessagesChat({ receiverId }: MessagesChatProps) {
    const [messages, setMessages] = useState<Message[]>([]);
    const [unreadMessages, setUnreadMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState("");
    const [online, setOnline] = useState<OnlineStatus>();
    const [socket, setSocket] = useState<Socket | null>(null);

    console.log(online);
    
    const session = useSessionContext();

    if (session.loading) {
        return <div>Loading...</div>;
    }
    const userId = session.userId;

    useEffect(() => {
        if (!socket) return;
        socket.on(GLOBAL_CONFIG.CHAT_SERVER.UNREAD_EVENT, (message) => {
            setUnreadMessages((prev) => [...prev, message]);
        });
        socket.on(GLOBAL_CONFIG.CHAT_SERVER.READ_EVENT, (messages) => {
            setMessages(prev => [...prev, messages]);
        });
        return () => {
            socket.disconnect();
        };
    }, [socket, userId, receiverId]);

    useEffect(() => {
        async function makeConnection() {
            try {
                const socketInstance = await initSocketConnection();
                setSocket(socketInstance);
                const response = await fetch(`http://localhost:8084/messages/get/${userId}/${receiverId}`)
                const data = await response.json();
                setMessages((prev) => [...prev, ...data]);
                socketInstance.on(GLOBAL_CONFIG.CHAT_SERVER.PSTATUS_EVENT, (status) => {
                    setOnline(status);
                });

            } catch (error) {
                console.error("Socket connection failed:", error);
            }
        }
        makeConnection();
        return () => {
            socket?.disconnect();
        };
    }, [socket, receiverId]);

    const handleSendMessage = async () => {
        if (!newMessage.trim()) return;
        const message: Message = {
            senderId: userId,
            receiverId,
            content: newMessage,
            status: "Sent",
            createdAt: new Date(),
            updatedAt: new Date()
        };
        socket!.emit(GLOBAL_CONFIG.CHAT_SERVER.MESSAGE_EVENT, message);
        setMessages((prev) => [...prev, message]);
        setNewMessage("");
    };

    /**
     * Refreshes the page for the receiver after an unreadmessage is received
     */
    useEffect(() => {
        if (unreadMessages.length === 0 || !socket) return;
        socket.emit(GLOBAL_CONFIG.CHAT_SERVER.READ_EVENT, unreadMessages);
        setUnreadMessages([]);
        async function fetchUpdatedMessages() {
            const response = await fetch(`http://localhost:8084/messages/get/${userId}/${receiverId}`);
            const data = await response.json();
            setMessages(data);
        }
        fetchUpdatedMessages();
    }, [unreadMessages, socket, userId, receiverId]);

    return (
        <Page className="h-screen mt-2">
            <div className="flex">
                <MessagesSidebar userId={userId} />
                <div className="flex flex-col flex-grow">
                    <div className="p-4 flex items-center space-x-3 bg-gray-100">
                        <Avatar>
                            <AvatarFallback>{receiverId[0]}</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                            <h2 className="text-lg font-semibold">{receiverId}</h2>
                            <span className={`text-sm ${online?.status ? "text-green-500" : "text-gray-500"}`}>
                                {online?.status ? "Online" : "Offline"}
                            </span>
                        </div>
                    </div>
                    <MessagesScroll messages={messages} userId={userId} unreadMessages={unreadMessages} />
                    <div className="p-4 bg-white">
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                handleSendMessage();
                            }}
                            className="flex space-x-2"
                        >
                            <Input
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                placeholder="Type a message..."
                                className="flex-1"
                            />
                            <Button type="submit">
                                <Send className="h-4 w-4 mr-2" />
                                Send
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        </Page>
    );
}

