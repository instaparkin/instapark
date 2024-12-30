interface ProduceMessageProps {
    key: string
    data: Record<string, unknown> | string
    partition: number
}