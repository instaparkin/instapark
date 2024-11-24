import {
    generateUploadButton,
    generateUploadDropzone,
} from "@uploadthing/react";

import type { OurFileRouter } from "./uploadthing-server";

export const UploadButton = generateUploadButton<OurFileRouter>({
    url: "http://localhost:8080/listings/uploadthing",
});
export const UploadDropzone = generateUploadDropzone<OurFileRouter>({
    url: "http://localhost:8080/listings/uploadthing"
});
