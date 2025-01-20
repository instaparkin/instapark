export type EventType = "SUCCESS" | "FAILURE" | "LOADING"

export type ApiResponse<T> = {
    message: string,
    status: EventType,
    data?: T
}