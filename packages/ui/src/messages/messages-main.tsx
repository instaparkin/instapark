'use client'

import { Button } from "../components/button"
import { Page } from "../components/page"
import { icons, MessageCircle } from 'lucide-react'
import { useSessionContext } from "@instapark/auth"
import { MessagesSidebar } from "./messages-sidebar"
import { NoResults } from "../components/no-results"

export function MessagesMain() {
    const session = useSessionContext();

    if (session.loading) {
        return null;
    }
    const userId = session.userId;

    return (
        <Page>
            <div className="grid grid-cols-1 md:grid-cols-[300px_1fr]">
                <MessagesSidebar userId={userId} />
                <div className="flex flex-col h-[calc(100vh-64px)]">
                    <div className="flex flex-1 flex-col items-center justify-center text-center">
                        <NoResults
                            text={"Select a conversation or start a new one"}
                            icon={<MessageCircle className="h-12 w-12 text-muted-foreground/50" />}
                        />
                    </div>
                </div>
            </div>
        </Page >
    )
}

