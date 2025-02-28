import { GraphQLBoolean, GraphQLFloat, GraphQLInt, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";

export const KYCType = new GraphQLObjectType({
    name: "kyc",
    fields: {
        uidai: { type: GraphQLString },
        verified: { type: GraphQLBoolean }
    }
})

export const ProfileType = new GraphQLObjectType({
    name: "Profile",
    fields: {
        userId: { type: new GraphQLNonNull(GraphQLString) },
        firstName: { type: new GraphQLNonNull(GraphQLString) },
        lastName: { type: new GraphQLNonNull(GraphQLString) },
        emails: { type: new GraphQLList(GraphQLString) },
        timeJoined: { type: GraphQLInt },
        phoneNumber: { type: GraphQLString },
        kyc: { type: KYCType },
        country: { type: GraphQLString },
        state: { type: GraphQLString },
        district: { type: GraphQLString },
        city: { type: GraphQLString },
        street: { type: GraphQLString },
        pincode: { type: GraphQLInt },
        latitude: { type: GraphQLFloat },
        longitude: { type: GraphQLFloat },
        name: { type: GraphQLString },
        landmark: { type: GraphQLString },
    },
})

export const SplitAddressType = new GraphQLObjectType({
    name: "AadharVerifySplitAddress",
    fields: {
        country: { type: GraphQLString },
        dist: { type: GraphQLString },
        house: { type: GraphQLString },
        landmark: { type: GraphQLString },
        pincode: { type: GraphQLInt },
        po: { type: GraphQLString },
        state: { type: GraphQLString },
        street: { type: GraphQLString },
        subdist: { type: GraphQLString },
        vtc: { type: GraphQLString },
        locality: { type: GraphQLString },
    },
});

export const AadhaarResponseType = new GraphQLObjectType({
    name: "AadhaarVerifyResponse",
    fields: {
        ref_id: { type: GraphQLString },
        status: { type: GraphQLString },
        message: { type: GraphQLString },
        care_of: { type: GraphQLString },
        address: { type: GraphQLString },
        dob: { type: GraphQLString },
        email: { type: GraphQLString },
        gender: { type: GraphQLString },
        name: { type: GraphQLString },
        split_address: { type: SplitAddressType },
        year_of_birth: { type: GraphQLInt },
        mobile_hash: { type: GraphQLString },
        photo_link: { type: GraphQLString },
        share_code: { type: GraphQLString },
        xml_file: { type: GraphQLString },
    },
});