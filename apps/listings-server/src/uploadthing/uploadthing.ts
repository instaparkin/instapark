import { createUploadthing, type FileRouter } from "uploadthing/express";

const f = createUploadthing();

export const uploadRouter = {
  imageUploader: f({
    image: {
      maxFileSize: "4MB",
      maxFileCount: 8,
    },
  })
  .onUploadError((data) =>{
    console.log(data.res);
  })
  .onUploadComplete((data) => {
    console.log("upload completed", data);
  })
} satisfies FileRouter;

export type OurFileRouter = typeof uploadRouter;