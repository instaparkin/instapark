"use client"

import { ListingsAddType } from "@instapark/listings";
import { generateUploadDropzone } from "@uploadthing/react";
import { UseFormReturn } from "react-hook-form";
import { toast } from "react-hot-toast";
import { OurFileRouter } from "@instapark/listings";

export const UploadDropzone = generateUploadDropzone<OurFileRouter>({
    url: "http://localhost:8087/listings/uploadthing"
});

export const ListingsAddPhotos = ({ form }: { form: UseFormReturn<ListingsAddType> }) => {
    return (
        <UploadDropzone
            endpoint="imageUploader"
            onClientUploadComplete={(res) => {
                console.log(res)
                    const currentPhotos = form.getValues("photos") || [];
                    const newPhotos = res?.map((file) => ({ url: file.url }));
                    form.setValue("photos", [...currentPhotos, ...newPhotos]);
                toast.success("Upload Complete")
            }}
            onUploadError={(error) => {
                toast.error(`${error.message}`)
            }}
        />
    );
};
