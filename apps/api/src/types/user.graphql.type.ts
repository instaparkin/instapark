import { GraphQLBoolean, GraphQLFloat, GraphQLInt, GraphQLList, GraphQLObjectType, GraphQLString } from "graphql";

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
        userId: { type: GraphQLString },
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        emails: { type: new GraphQLList(GraphQLString) },
        timeJoined: { type: GraphQLInt },
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
        reviews: { type: GraphQLInt },
        ratings: { type: GraphQLFloat }
    },
})