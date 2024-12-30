import { useEffect, useState } from 'react';
import { GLOBAL_CONFIG } from "@instapark/utils";
import { ScrollArea } from '../components/scroll-area';
import { type Message } from '@instapark/types';
import { Socket } from 'socket.io-client';

interface UnreadMessagesProps {
    userId: string;
    socket: Socket;
    onMessagesRead: (messages: Message[]) => void;
}

export function UnreadMessages({ userId, socket }: UnreadMessagesProps) {
    const [unreadMessages, setUnreadMessages] = useState<Message[]>([]);

    useEffect(() => {
        if (!socket) return;
        socket.on(GLOBAL_CONFIG.CHAT_SERVER.UNREAD_EVENT, (message) => {
            setUnreadMessages((prev) => [...prev, message]);
        });

        return () => {
            socket.disconnect();
        };
    }, [socket, userId]);

    if (unreadMessages.length === 0) {
        return null;
    }

    return (
        <ScrollArea className="h-40">
            <div className="p-4">
                <div className="mb-4">
                    <h3 className="text-sm font-medium text-muted-foreground">
                        {unreadMessages.length} Unread Messages
                    </h3>
                </div>
                <div className="space-y-2">
                    {unreadMessages.map((message, index) => (
                        <div key={index} className="p-2 bg-muted rounded-lg">
                            <p className="font-semibold">{message.senderId}</p>
                            <p>{message.content}</p>
                            <p className="text-xs text-muted-foreground">{new Date().toLocaleString()}</p>
                        </div>
                    ))}
                </div>
            </div>
        </ScrollArea>
    );
}

