"use client"

import { MessageCircle, Search, Settings } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Input } from '../components/input'
import { Button } from '../components/button'
import { Tabs, TabsList, TabsTrigger } from '../components/tabs'
import { ScrollArea } from '../components/scroll-area'
import { Contact } from '@instapark/types'
import { Avatar, AvatarFallback } from '../components/avatar'
import { useRouter, redirect } from "next/navigation";
import { NoResults } from '../components/no-results'
import { initSocketConnection } from '../components/socket'
import { GLOBAL_CONFIG } from '@instapark/utils'

interface MessagesSidebarProps {
    userId: string
}

export const MessagesSidebar = ({ userId }: MessagesSidebarProps) => {
    const [contacts, setContacts] = useState<Contact[]>([]);
    const router = useRouter();

    useEffect(() => {
        async function fetchContacts() {
            try {
                const socket = await initSocketConnection();
                socket?.on(GLOBAL_CONFIG.CHAT_SERVER.UNREAD_EVENT, async (message) => {
                    const response = await fetch(`http://localhost:8084/contacts/get/${userId}`);
                    const data = await response.json();
                    setContacts(data.contacts);
                })
                const response = await fetch(`http://localhost:8084/contacts/get/${userId}`);
                const data = await response.json();
                
                setContacts(data.contacts);
            } catch (error) {
                throw new Error("Failed to fetch contacts: " + error);
            }
        }
        fetchContacts();
    }, []);

    const handleSelectedUser = async (contact: Contact) => {
        router.push(`/messages/${contact.contactUserId}`)
    }

    return (
        <div className="border-r p-2">
            <div className="mb-2 flex gap-2">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input className="pl-9 w-full" placeholder="Search messages..." />
                </div>
                <Button variant="ghost" size="icon">
                    <Settings className="h-5 w-5" />
                </Button>
            </div>
            <Tabs defaultValue="all" className="mb-2">
                <TabsList className="grid w-full grid-cols-2 gap-2">
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="unread">Unread</TabsTrigger>
                </TabsList>
            </Tabs>
            <ScrollArea className="h-[calc(100vh-140px)]">
                <div className="pt-2">
                    {contacts.length === 0 ? (
                        <div className="flex min-h-[400px] flex-col items-center justify-center text-center">
                            <NoResults
                                text='No messages yet'
                                icon={<MessageCircle className="h-12 w-12 text-muted-foreground/50" />}
                            />
                        </div>
                    ) : (
                        <div className="space-y-2">
                            {contacts.map((contact, index) => (
                                <Button
                                    variant={"ghost"}
                                    key={index}
                                    className={`flex w-full items-center space-x-3 rounded-lg p-2 hover:bg-muted`}
                                    onClick={() => handleSelectedUser(contact)}
                                >
                                    <Avatar>
                                        <AvatarFallback>{contact.contactUserId[0]}</AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1 text-left">
                                        <h3 className="font-medium">{contact.contactUserId}</h3>
                                    </div>
                                </Button>
                            ))}
                        </div>
                    )}
                </div>
            </ScrollArea>
        </div>
    )
}
