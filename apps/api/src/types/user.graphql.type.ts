import { GraphQLBoolean, GraphQLFloat, GraphQLInt, GraphQLList, GraphQLObjectType, GraphQLString } from "graphql";

export const KYCType = new GraphQLObjectType({
    name: "kyc",
    fields: {
        uidai: { type: GraphQLInt },
        verified: { type: GraphQLBoolean }
    }
})

export const ProfileType = new GraphQLObjectType({
    name: "Profile",
    fields: {
        userId: { type: GraphQLString },
        phoneNumber: { type: GraphQLInt },
        kyc: { type: KYCType },
        country: { type: GraphQLString },
        state: { type: GraphQLString },
        district: { type: GraphQLString },
        city: { type: GraphQLString },
        street: { type: GraphQLString },
        pincode: { type: GraphQLString },
        latitude: { type: GraphQLFloat },
        longitude: { type: GraphQLFloat },
        name: { type: GraphQLString },
        landmark: { type: GraphQLString },
    }
})