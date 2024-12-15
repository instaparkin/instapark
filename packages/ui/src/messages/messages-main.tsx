'use client'

import { Avatar, AvatarFallback, AvatarImage } from "../components/avatar"
import { Button } from "../components/button"
import { Input } from "../components/input"
import { Page } from "../components/page"
import { ScrollArea } from "../components/scroll-area"
import { Tabs, TabsList, TabsTrigger } from "../components/tabs"
import { MessageCircle, Search, Settings } from 'lucide-react'

export function MessagesMain() {
    return (
        <Page title="Messages">
            <div className="grid grid-cols-1 md:grid-cols-[300px_1fr]">
                {/* Left Sidebar - Recipients */}
                <div className="border-r p-2">
                    <div className="pt-0 mb-2 flex gap-2">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <Input className="pl-9" placeholder="Search messages..." />
                        </div>
                        <Button variant="ghost" size="icon">
                            <Settings className="h-5 w-5" />
                        </Button>
                    </div>
                    <Tabs defaultValue="all" className="">
                        <TabsList className="grid w-full grid-cols-2 gap-2">
                            <TabsTrigger value="all">All</TabsTrigger>
                            <TabsTrigger value="unread">Unread</TabsTrigger>
                        </TabsList>
                    </Tabs>
                    <ScrollArea className="h-[calc(100vh-140px)]">
                        <div className="pt-2">
                            {/* Empty state for recipients */}
                            {recipients.length === 0 ? (
                                <div className="flex min-h-[400px] flex-col items-center justify-center text-center">
                                    <MessageCircle className="h-12 w-12 text-muted-foreground/50" />
                                    <h3 className="mt-4 text-lg font-semibold">No messages yet</h3>
                                    <p className="mb-4 mt-2 text-sm text-muted-foreground">
                                        When you receive a new message, it will appear here.
                                    </p>
                                </div>
                            ) : (
                                // List of recipients
                                <div className="space-y-2">
                                    {recipients.map((recipient) => (
                                        <button
                                            key={recipient.id}
                                            className="flex w-full items-center space-x-3 rounded-lg p-2 hover:bg-accent"
                                        >
                                            <Avatar>
                                                <AvatarImage src={recipient.avatar} alt={recipient.name} />
                                                <AvatarFallback>{recipient.name[0]}</AvatarFallback>
                                            </Avatar>
                                            <div className="flex-1 text-left">
                                                <h3 className="font-medium">{recipient.name}</h3>
                                                <p className="text-sm text-muted-foreground line-clamp-1">
                                                    {recipient.lastMessage}
                                                </p>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </ScrollArea>
                </div>

                {/* Right Side - Chat Interface */}
                <div className="flex flex-col">
                    {/* Empty state for chat */}
                    <div className="flex flex-1 flex-col items-center justify-center text-center">
                        <MessageCircle className="h-12 w-12 text-muted-foreground/50" />
                        <h3 className="mt-4 text-lg font-semibold">Your messages</h3>
                        <p className="mb-4 mt-2 text-sm text-muted-foreground">
                            Select a conversation or start a new one.
                        </p>
                        <Button>New Message</Button>
                    </div>
                </div>
            </div>
        </Page>
    )
}

// Sample data
const recipients = [
    {
        id: 1,
        name: "Alice Smith",
        avatar: "/placeholder.svg",
        lastMessage: "Hey, how are you doing?",
    },
    {
        id: 2,
        name: "Bob Johnson",
        avatar: "/placeholder.svg",
        lastMessage: "Can we meet tomorrow?",
    },
    {
        id: 3,
        name: "Carol Williams",
        avatar: "/placeholder.svg",
        lastMessage: "The project is looking great!",
    },
]

