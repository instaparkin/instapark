import { createRouteHandler } from "uploadthing/express";
import { uploadRouter } from "./upload-router";

export const uploadthingExpress = createRouteHandler({
    router: uploadRouter,
})