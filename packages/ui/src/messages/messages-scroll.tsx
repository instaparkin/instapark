import { ScrollArea } from '@radix-ui/react-scroll-area'
import { Message } from '@instapark/types'
import dayjs from 'dayjs'
import { useEffect, useRef } from 'react'
import { MessageBubble } from './messges-bubble'

interface MessagesScrollProps {
  messages: Message[]
  userId: string
  unreadMessages?: Message[]
}

export function MessagesScroll({ messages, userId, unreadMessages = [] }: MessagesScrollProps) {
  const groupedMessages = groupMessagesByDate(messages)
  const groupedUnread = groupMessagesByDate(unreadMessages);

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messages || unreadMessages) {
      scrollRef.current?.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages, unreadMessages])

  return (
    <ScrollArea className="h-full p-4">
      {unreadMessages.length > 0 && (
        <div className="mb-6">
          <h3 className="text-sm font-medium text-muted-foreground mb-3">
            {unreadMessages.length} Unread Messages
          </h3>
          {Object.entries(groupedUnread).map(([date, dateMessages]) => (
            <div key={date} className="space-y-4">
              <div className="flex justify-center">
                <span className="px-3 py-1 text-xs font-medium text-muted-foreground bg-muted rounded-full">
                  {date}
                </span>
              </div>
              <div className="space-y-2">
                {dateMessages.map((message, index) => (
                  <MessageBubble
                    key={index}
                    message={message}
                    isCurrentUser={message.senderId === userId}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
      {Object.entries(groupedMessages).map(([date, dateMessages]) => (
        <div key={date} className="space-y-4 mb-6">
          <div className="flex justify-center">
            <span className="px-3 py-1 text-xs font-medium text-muted-foreground bg-muted rounded-full">
              {date}
            </span>
          </div>
          <div className="space-y-2">
            {dateMessages.map((message, index) => (
              <MessageBubble
                key={index}
                message={message}
                isCurrentUser={message.senderId === userId}
              />
            ))}
          </div>
        </div>
      ))}
      <div ref={scrollRef}></div>
    </ScrollArea>
  )
}

export function formatMessageDate(date: Date): string {
  const today = dayjs();
  const yesterday = today.subtract(1, 'day');
  const messageDate = dayjs(date);

  if (messageDate.isSame(today, 'day')) {
    return 'Today';
  } else if (messageDate.isSame(yesterday, 'day')) {
    return 'Yesterday';
  } else {
    return messageDate.format('MMMM D, YYYY'); // e.g., "January 1, 2024"
  }
}

export function groupMessagesByDate(messages: Message[]): Record<string, Message[]> {
  return messages.reduce((groups, message) => {
    const date = new Date(message.createdAt as Date);
    const dateKey = formatMessageDate(date);

    if (!groups[dateKey]) {
      groups[dateKey] = [];
    }

    groups[dateKey].push(message);
    return groups;
  }, {} as Record<string, Message[]>);
}
