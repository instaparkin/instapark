"use client"

import React from "react";
import { OurFileRouter } from "@instapark/listings";
import { generateUploadButton } from "@uploadthing/react";

export const UploadButton = generateUploadButton<OurFileRouter>({
    url: "http://localhost:8080/listings/uploadthing",
});

export const UploadThingButton = () => {
    return (
        <UploadButton
            endpoint="imageUploader"
            onClientUploadComplete={(res) => {
                console.log("Files: ", res);
                alert("Upload Completed");
            }}
            onUploadError={(error: Error) => {
                alert(`ERROR! ${error.message}`);
            }}
        />
    )
}