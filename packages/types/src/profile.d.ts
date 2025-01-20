export type Profile = {
    userId: string
    userProof: {
        governmentId: string
        frontsideUrl: string
        backsideUrl: string
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