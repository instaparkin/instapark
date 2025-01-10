"use client"

import React, { HTMLAttributes, useEffect, useRef, useState } from 'react'
import { Button } from '../components/button'
import { ArrowLeft, Check, Mic, MoreVertical, Send, Smile } from 'lucide-react'
import { Input } from '../components/input'
import { ScrollArea } from '../components/scroll-area'
import { Avatar, AvatarFallback, AvatarImage } from '../components/avatar'
import { axios, GLOBAL_CONFIG, logger } from '@instapark/utils'
import { Message } from '@instapark/types'
import { MessageBubble } from './messges-bubble'
import { useAuth } from '../hooks/use-auth'
import { cn } from '../utils/cn'
import { useSocket } from '../components/socket'
import { apiEndpoint } from '../utils/format-endpoint'

interface MessagesChatNew {
    receiverId: string
}

interface ChatContentProps extends
    HTMLAttributes<HTMLDivElement> { }

interface ChatHeaderProps extends
    HTMLAttributes<HTMLDivElement> { }

interface ChatFooterProps extends
    HTMLAttributes<HTMLDivElement> { }

interface ChatProps extends
    HTMLAttributes<HTMLDivElement> {
    showChatOnMobile: boolean
}

const Chat: React.FC<ChatProps> =
    ({ className, children, showChatOnMobile }) => {
        return (
            <div className={cn(`${showChatOnMobile ? 'flex' : 'hidden md:flex'} flex-1 flex-col`, className)}>
                {children}
            </div>
        )
    }

const ChatHeader: React.FC<ChatHeaderProps> =
    ({ children, className }) => {
        return (
            <div className="py-3 md:p-3 flex items-center justify-between bg-card">
                <div className={cn("flex items-center", className)}>
                    {children}
                </div>
            </div>
        );
    };

const ChatContent: React.FC<ChatContentProps> =
    ({ children, className }) => {

        const scrollRef = useRef<HTMLDivElement>(null)
        useEffect(() => {
            if (scrollRef.current) {
                scrollRef.current.scrollIntoView({
                    behavior: "instant"
                })
            }
        }, [children])

        return (
            <ScrollArea className="flex-1 p-4 space-y-4">
                <div className={cn(className)}>
                    {children}
                    <div ref={scrollRef}></div>
                </div>
            </ScrollArea>
        )
    };

const ChatFooter: React.FC<ChatFooterProps> =
    ({ children, className }) => (
        <div className={cn("py-3 flex items-center gap-2 bg-card", className)}>
            {children}
        </div>
    );

export const MessagesChatNew: React.FC<MessagesChatNew> = ({ receiverId }) => {

    const [selectedChat, setSelectedChat] = useState<number | null>(null);
    const showChatOnMobile = selectedChat !== null;
    const { userId } = useAuth() ?? {};
    const [messages, setMessages] = useState<Message[]>([]);
    const { socket } = useSocket();

    useEffect(() => {
        if (userId && receiverId) {
            const endpoint = apiEndpoint({
                url: "http://localhost:8084/messages/get/${userId}/${receiverId}",
                params: {
                    userId,
                    receiverId
                }
            })
            axios.get(endpoint)
                .then((res) => {
                    setMessages(res.data);
                })
                .catch((error) => {
                    logger.error(error);
                });
        }
    }, [userId, receiverId]);

    useEffect(()=>{
        socket.emit(GLOBAL_CONFIG.CHAT_SERVER.READ_EVENT, messages[messages.length - 1])
    },[messages])

    useEffect(() => {
        /**
         * For the sender
         */
        socket!.on(GLOBAL_CONFIG.CHAT_SERVER.MSTATUS_EVENT, (message) => {
            console.log("Sender: " + JSON.stringify(message));
            setMessages(prev => [...prev.slice(0, -1), message]);
        })
        /**
         * For the receiver
         */
        socket!.on(GLOBAL_CONFIG.CHAT_SERVER.UNREAD_EVENT, (message) => {
            console.log(message);
            setMessages(prev => [...prev, message]);
        })

        return () => {
            socket.disconnect()
        }

    }, [socket]);

    const [newMessage, setNewMessage] = useState("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!newMessage.trim()) return;
        const message: Message = {
            senderId: userId as string,
            receiverId,
            content: newMessage,
            status: "Sending",
            createdAt: new Date(),
            updatedAt: new Date(),
        };
        socket!.emit(GLOBAL_CONFIG.CHAT_SERVER.MESSAGE_EVENT, message);
        setMessages((prev) => [...prev, message]);
        setNewMessage("");
    };

    return (
        <Chat showChatOnMobile={showChatOnMobile}>
            <ChatHeader className='flex justify-between'>
                {showChatOnMobile && (
                    <Button
                        variant="ghost"
                        size="icon"
                        className="md:hidden"
                        onClick={() => setSelectedChat(null)}
                    >
                        <ArrowLeft className="h-5 w-5" />
                    </Button>
                )}
                <Avatar className="h-10 w-10">
                    <AvatarImage src="/placeholder.svg" />
                    <AvatarFallback>A</AvatarFallback>
                </Avatar>
                <div>
                    <p className="font-medium">User Name {(selectedChat || 0) + 1}</p>
                    <p className="text-sm text-muted-foreground">typing...</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="ghost" size="icon">
                        <MoreVertical className="h-5 w-5" />
                    </Button>
                </div>
            </ChatHeader>
            <ChatContent className="space-y-4">
                {messages.map((m, index) => (
                    <MessageBubble key={index} message={m} />
                ))}
            </ChatContent>
            <ChatFooter>
                <Button variant="ghost" size="icon">
                    <Smile className="h-5 w-5" />
                </Button>
                <form className="flex w-full" onSubmit={(e) => handleSubmit(e)}>
                    <Input
                        placeholder="Type a message"
                        className="flex-1"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                    />
                    <Button type="submit" variant="ghost" size="icon">
                        <Send className="h-5 w-5" />
                    </Button>
                </form>

                <Button variant="ghost" size="icon">
                    <Mic className="h-5 w-5" />
                </Button>
            </ChatFooter>
        </Chat>
    )
}
