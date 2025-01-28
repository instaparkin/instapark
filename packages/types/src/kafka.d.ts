export type MessageType = "POST" | "PUT" | "DELETE" | 'PATCH'

export type ProducerType<T> = {
    type: MessageType
    data: T
    partition: number
}

export type ConsumerType<T> = Pick<ProducerType<T>, "type" | "data">;