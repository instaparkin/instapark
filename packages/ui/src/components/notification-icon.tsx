"use client"

import { IoNotificationsOutline } from 'react-icons/io5';
import { Card, CardContent } from './card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './tabs';
import { Button } from './button';
import { AlertTriangle, Archive, Bell, Settings, X } from 'lucide-react';
import { ScrollArea } from './scroll-area';
import { Popover, PopoverContent, PopoverTrigger } from './popover';
import { useEffect, useState } from 'react';
import { initSocketConnection } from './socket';
import { MessageStatus } from '../messages/messages-status';
import { GLOBAL_CONFIG } from '@instapark/utils';
import { useSessionContext } from '@instapark/auth';
import { Icon } from './icon';


interface Message {
    senderId: string
    receiverId: string
    content: string
    status: string
}

export const NotificationIcon = ({ userId }: { userId: string }) => {

    const [unreadMessages, setUnreadMessages] = useState<Message[]>([]);

    useEffect(() => {
        async function getUnreadMessages() {
            const socket = await initSocketConnection();
            socket?.on(GLOBAL_CONFIG.CHAT_SERVER.UNREAD_EVENT, async (message) => {
                const response = await fetch(`http://localhost:8084/messages/get/unread/${userId}`)
                const data: Message[] = await response.json();
                console.log(data);
                setUnreadMessages(data)
            })
            return () => {
                socket?.disconnect();
            };
        }
        getUnreadMessages()
    }, [unreadMessages])

    return (
        <Popover>
            <PopoverTrigger>
                    <Icon className="relative">
                        <Bell className="h-4 w-4" />
                        {
                            unreadMessages?.length ?
                                <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-[10px] font-medium text-white flex items-center justify-center">
                                    {unreadMessages?.length}
                                </span> : null
                        }
                    </Icon>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0">
                <Card className="w-[min(calc(100vw-2rem),400px)] border-0 shadow-none">
                    <Tabs defaultValue="inbox" className="w-full">
                        <div className="flex items-center justify-between px-4 py-2 border-b">
                            <TabsList className='space-x-2'>
                                <TabsTrigger value="inbox">
                                    Inbox
                                </TabsTrigger>
                                <TabsTrigger value="archive">
                                    Archive
                                </TabsTrigger>
                                <TabsTrigger value="comments">
                                    Comments
                                </TabsTrigger>
                            </TabsList>
                            <Button variant="ghost" size="icon">
                                <Settings className="h-4 w-4" />
                            </Button>
                        </div>

                        <TabsContent value="inbox" className="m-0">
                            <ScrollArea className="h-[min(calc(100vh-8rem),400px)]">
                                <CardContent className="p-0">
                                    {unreadMessages.map((message, index) => (
                                        <div
                                            key={index}
                                            className="flex gap-3 p-4 border-b hover:bg-accent transition-colors"
                                        >
                                            <div className="space-y-1">
                                                <p className="text-sm">{message.content}</p>
                                            </div>
                                        </div>
                                    ))}
                                </CardContent>
                            </ScrollArea>
                            <div className="p-4 border-t">
                                <Button
                                    variant="ghost"
                                    className="w-full"
                                    size="sm"
                                >
                                    <Archive className="h-4 w-4 mr-2" />
                                    Archive All
                                </Button>
                            </div>
                        </TabsContent>
                    </Tabs>
                </Card>
            </PopoverContent>
        </Popover>
    );
};
