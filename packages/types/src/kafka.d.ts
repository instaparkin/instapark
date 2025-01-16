import { Listing } from "./Listing"

export type MessageType = "POST" | "PUT" | "DELETE"

export type SearchProducerType = {
    type: MessageType
    data: Listing | string
    partition: number
}

export type SearchConsumerType = Pick<SearchProducerType, "type" | "data">;