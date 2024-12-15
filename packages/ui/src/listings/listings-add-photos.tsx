"use client"

import { ListingsAddType, OurFileRouter } from "@instapark/listings";
import { generateUploadButton, generateUploadDropzone } from "@uploadthing/react";
import { UseFormReturn } from "react-hook-form";

export const UploadButton = generateUploadButton<OurFileRouter>({
    url: "http://localhost:8087/listings/uploadthing",
});

export const ListingsAddPhotos = ({ form }: { form: UseFormReturn<ListingsAddType> }) => {

    console.log(form.getValues("photos"));
    return (
        <>
            <UploadButton
                endpoint="imageUploader"
                onClientUploadComplete={(res) => {
                    res.map((file) => form.setValue("photos", [...form.getValues("photos"), { url: file.url }]));
                    alert("Upload Completed");
                }}
                onUploadError={(error: Error) => {
                    alert(`ERROR! ${error.message}`);
                }}
            />
        </>
    )
}
