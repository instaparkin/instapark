import { MessagesChat } from '@instapark/ui'
import { WhatsAppInterface } from "@instapark/ui"
import { Page } from '@instapark/ui/src/components/page';

interface MessageChatPageProps {
    params: Promise<{ id: string }>
}

const MessageChatPage = async ({ params }: MessageChatPageProps) => {
    const receiverId = (await params).id;
    return (
        <WhatsAppInterface receiverId={receiverId} />
    )
}

export default MessageChatPage