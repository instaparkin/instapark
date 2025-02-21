export type Profile = {
    userId: string
    firstName: string
    lastName: string
    emails: string[]
    timeJoined: number
    phoneNumber: string
    kyc: {
        uidai: string
        verified: boolean
    }
    country: string;
    state: string;
    district: string;
    city: string;
    street: string;
    pincode: number;
    latitude: number;
    longitude: number;
    name?: string;
    landmark?: string;
    reviews: number
    ratings: number
}

export type ProfileRequest = Omit<Profile, "userId" | "kyc"> & {
    kyc: Pick<Profile["kyc"], "uidai">
}

export type LikedListing = {
    id: string,
    listingId: string,
    userId: string
}

export type LikedListingRequest = Omit<LikedListing, "id">