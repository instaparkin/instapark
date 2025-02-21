import { LikedListing } from "@instapark/types";
import mongoose, { Schema } from "mongoose";

export const LikedSchema = new Schema<LikedListing>({
    id: {
        type: String,
        required: true
    },
    listingId: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    }
})

const LikedListingModel = mongoose.model("LikedListing", LikedSchema)

export { LikedListingModel }