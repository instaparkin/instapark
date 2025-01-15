import { Response } from "express";
import { ApiResponse } from "@instapark/types";

export const sendResponse = <T>(
    res: Response,
    statusCode: number,
    message: string,
    status: "SUCCESS" | "FAILURE",
    data?: T
) => {
    const response: ApiResponse<T> = { message, status, data };
    res.status(statusCode).json(response);
};
