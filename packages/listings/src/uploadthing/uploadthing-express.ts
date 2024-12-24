"use server"

import { createRouteHandler } from "uploadthing/express";
import { uploadRouter } from "./upload-router";

export const uploadthingExpress = createRouteHandler({
    router: uploadRouter,
    config : {
        callbackUrl : "http://localhost:3000/hosting/listings/add",
    }
})