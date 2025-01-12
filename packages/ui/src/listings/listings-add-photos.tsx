"use client"

import React from "react";
import { ListingsAddType } from "@instapark/listings";
import { generateUploadDropzone } from "@uploadthing/react";
import { UseFormReturn } from "react-hook-form";
import { toast } from "react-hot-toast";
import { OurFileRouter } from "@instapark/listings";
import uiConfig from "../../ui-config.json";
import { v4 as uuid } from "uuid"
import Image from "next/image";
import { Button } from "../components/button";
import { X } from "lucide-react";

export const UploadDropzone = generateUploadDropzone<OurFileRouter>({
    url: uiConfig.routes.LISTING_ADD_IMAGE_ROUTE
});

export const ListingsAddPhotos = ({ form }: { form: UseFormReturn<ListingsAddType> }) => {
    const removePhoto = (photoId: string) => {
        const currentPhotos = form.getValues("photos") || []
        const updatedPhotos = currentPhotos.filter((photo) => photo.photoId !== photoId)
        form.setValue("photos", updatedPhotos)
    }
    return (
        <div className="space-y-6">
            <UploadDropzone
                endpoint="imageUploader"
                onClientUploadComplete={(res) => {
                    const currentPhotos = form.getValues("photos") || [];
                    const newPhotos = res?.map((file) => ({
                        url: file.url,
                        listingId: uuid(),
                        photoId: uuid(),
                        createdAt: new Date(),
                        updatedAt: new Date(),
                    }));
                    form.setValue("photos", [...currentPhotos, ...newPhotos]);
                    toast.success("Upload Complete");
                }}
                onUploadError={(error) => {
                    toast.error(`${error.message}`);
                }}
            />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {form.getValues("photos").map((photo) => (
                    <div key={photo.photoId} className="relative group">
                        <Image
                            src={photo.url}
                            width={200}
                            height={200}
                            alt="Listing Photo"
                            className="rounded-md object-cover w-full h-40"
                        />
                        <Button
                            variant="destructive"
                            size="icon"
                            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={() => removePhoto(photo.photoId)}
                        >
                            <X className="h-4 w-4" />
                            <span className="sr-only">Remove photo</span>
                        </Button>
                    </div>
                ))}
            </div>
        </div>
    );
};

