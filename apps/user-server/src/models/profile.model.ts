import mongoose from "mongoose"
import { Profile } from "@instapark/types";

const profileSchema = new mongoose.Schema<Profile>({
    userId: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    emails: {
        type: [String],
        required: true
    },
    timeJoined: {
        type: Number,
        required: true
    },
    phoneNumber: {
        type: String,
    },
    kyc: {
        uidai: {
            type: String,
        },
        verified: {
            type: Boolean,
        },
    },
    country: {
        type: String,
    },
    state: {
        type: String,
    },
    district: {
        type: String,
    },
    city: {
        type: String,
    },
    street: {
        type: String,
    },
    pincode: {
        type: Number,
    },
    latitude: {
        type: Number,
    },
    longitude: {
        type: Number,
    },
    name: {
        type: String,
    },
    landmark: {
        type: String,
    },
    reviews: {
        type: Number,
        default: 0
    },
    ratings: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

const ProfileModel = mongoose.model('Profile', profileSchema);

export { ProfileModel }