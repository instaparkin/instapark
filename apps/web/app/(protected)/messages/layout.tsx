import { AppSidebar, SidebarProvider, SidebarTrigger } from '@instapark/ui'
import { Page } from '@instapark/ui/src/components/page';
import React, { ReactNode } from 'react'

const MessageLayout = ({ children }: { children: ReactNode }) => {
    return (
        <SidebarProvider>
            <AppSidebar />
            <main>
                {children}
                <SidebarTrigger />
            </main>
        </SidebarProvider>
    )
}

export default MessageLayout;