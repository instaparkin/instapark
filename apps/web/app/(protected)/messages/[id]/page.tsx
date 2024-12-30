import { MessagesChat } from '@instapark/ui'

interface MessageChatPageProps {
    params: Promise<{ id: string }>
}

const MessageChatPage = async ({ params }: MessageChatPageProps) => {
    const receiverId = (await params).id;
    return (
        <MessagesChat receiverId={receiverId} />
    )
}

export default MessageChatPage