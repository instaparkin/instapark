interface MessageChatPageProps {
    params: Promise<{ id: string }>
}

const MessageChatPage = async ({ params }: MessageChatPageProps) => {
    const receiverId = (await params).id;
    return (
        <div></div>
    )
}

export default MessageChatPage