"use client"

import { ListingsAddType, OurFileRouter } from "@instapark/listings";
import { generateUploadButton, generateUploadDropzone } from "@uploadthing/react";
import { UseFormReturn } from "react-hook-form";
import { toast } from "react-hot-toast"

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
                    toast.success("Upload Complete")
                }}
                onUploadError={(error: Error) => {
                    toast.error(`${error.message}`)
                }}
            />
        </>
    )
}
