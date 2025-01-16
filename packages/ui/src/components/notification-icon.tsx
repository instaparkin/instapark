"use client"

import React from 'react';
import { Card, CardContent } from './card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './tabs';
import { Button } from './button';
import { Archive, Bell, Settings} from 'lucide-react';
import { ScrollArea } from './scroll-area';
import { Popover, PopoverContent, PopoverTrigger } from './popover';
import { useEffect, useState } from 'react';
import { Icon } from './icon';
import { apiEndpoint } from '../utils/format-endpoint';
import axios from 'axios';

interface Message {
    senderId: string
    receiverId: string
    content: string
    status: string
}

export const NotificationIcon = ({ userId }: { userId: string }) => {

    return (
        <Popover>
            <PopoverTrigger>
                <Icon className="relative">
                    <Bell className="h-4 w-4" />
                    {
                        "as" ?
                            <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-[10px] font-medium text-white flex items-center justify-center">
                                {123}
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
