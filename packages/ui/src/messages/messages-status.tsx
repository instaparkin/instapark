import React from 'react'
import { Check, Timer } from 'lucide-react'
import { Message } from "@instapark/types"

interface DoubleTickProps {
    status: Message["status"]
}

export const MessageStatus: React.FC<DoubleTickProps> = ({ status }) => {
    return (
        <div className="inline-flex">
            {status === "Sending" && (
                <Timer size={16} />
            )}
            {status === 'Sent' && (
                <Check size={16} className="text-gray-500" />
            )}
            {(status === 'Delivered' || status === 'Read') && (
                <>
                    <Check size={16} className={status === 'Read' ? 'text-blue-500' : 'text-gray-500'} />
                    <Check size={16} className={`-ml-2 ${status === 'Read' ? 'text-blue-500' : 'text-gray-500'}`} />
                </>
            )}
        </div>
    )
}

