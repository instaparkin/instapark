export type Profile = {
    userId: string
    phoneNumber: number
    kyc: {
        uidai: number
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
}

export type ProfileRequest = Omit<Profile, "userId" |"kyc"> & {
    kyc: Pick<Profile["kyc"], "uidai">
}
