import { uploadRouter } from "./uploadthing-server";
import { createRouteHandler } from "uploadthing/express";

export const uploadthingRouter = createRouteHandler({
    router: uploadRouter,
})