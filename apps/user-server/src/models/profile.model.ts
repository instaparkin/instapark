import mongoose from "mongoose"
import { Profile } from "@instapark/types";

const profileSchema = new mongoose.Schema<Profile>({
    userId: {
        type: String,
        required: true,
    },
    userProof: {
        governmentId: {
            type: String,
            required: false,
        },
        frontsideUrl: {
            type: String,
            required: false,
        },
        backsideUrl: {
            type: String,
            required: false,
        },
    },
    country: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    district: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    street: {
        type: String,
        required: true,
    },
    pincode: {
        type: Number,
        required: true,
    },
    latitude: {
        type: Number,
        required: true,
    },
    longitude: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: false,
    },
    landmark: {
        type: String,
        required: false,
    },
}, { timestamps: true });

const ProfileModel = mongoose.model('Profile', profileSchema);

export { ProfileModel }