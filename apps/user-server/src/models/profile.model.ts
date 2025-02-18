import mongoose from "mongoose"
import { Profile } from "@instapark/types";

const profileSchema = new mongoose.Schema<Profile>({
userId: {
    type: String,
    required: true,
},
phoneNumber: {
    type: Number,
},
kyc: {
    uidai: {
        type: Number,
    },
    verified: {
        type: Boolean,
        default: false
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
}, { timestamps: true });

const ProfileModel = mongoose.model('Profile', profileSchema);

export { ProfileModel }