export function MessagesTyping() {
    return (
        <div className="flex items-center gap-1 rounded-full px-4 py-2 w-fit">
            {
                Array.from({ length: 3 }, (_, i) => (
                    <div className="w-2 h-2 rounded-full animate-[bounce_1.4s_infinite_.2s] opacity-75" />
                ))
            }
        </div>
    )
}