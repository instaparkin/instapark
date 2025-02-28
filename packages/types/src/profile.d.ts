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
}

export type ProfileRequest = Omit<Profile, "userId" | "kyc" | "firstName" | "lastName" | "emails" | "timeJoined"> & {
    kyc: Pick<Profile["kyc"], "uidai">
}