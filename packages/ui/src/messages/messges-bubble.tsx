import { Message } from "@instapark/types"
import { MessageStatus } from "./messages-status"
import { cn } from "../utils/cn"
import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'

dayjs.extend(localizedFormat);

interface MessageBubbleProps {
    message: Message
    isCurrentUser: boolean
}

export function MessageBubble({ message, isCurrentUser }: MessageBubbleProps) {
    const date = dayjs(message.createdAt).format("LT");
    return (
        <div className={cn("flex", isCurrentUser ? "justify-end" : "justify-start")}>
            <div
                className={cn(
                    "flex flex-col gap-1 max-w-[70%] rounded-lg p-3",
                    isCurrentUser ? "bg-primary text-primary-foreground" : "bg-muted"
                )}
            >
                <p className="break-words">{message.content}</p>
                <div className="flex items-center justify-end gap-2 text-xs">
                    <span className="text-muted-foreground">
                        {date}
                    </span>
                    {isCurrentUser && <MessageStatus status={message.status} />}
                </div>
            </div>
        </div>
    )
}
