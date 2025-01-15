export type ApiResponse<T> = {
    message: string,
    status: "SUCCESS" | "FAILURE",
    data?: T
}