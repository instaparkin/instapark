import { GraphQLBoolean, GraphQLFloat, GraphQLInputObjectType, GraphQLInt, GraphQLList, GraphQLObjectType, GraphQLString } from "graphql";
import { KYCType, ProfileType } from "../types/user.graphql.type";
import { axios } from "@instapark/utils";
import { ApiResponse } from "@instapark/types";

export const KYCInputType = new GraphQLInputObjectType({
    name: "KYCInput",
    fields: {
        uidai: { type: GraphQLInt },
        verified: { type: GraphQLBoolean }
    }
});

export const UserMutation = new GraphQLObjectType({
    name: "UserMutation",
    fields: {
        upsertProfile: {
            type: GraphQLString,
            args: {
                userId: { type: GraphQLString },
                phoneNumber: { type: GraphQLInt },
                kyc: { type: KYCInputType },
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
            },
            resolve: async (parent, args) => {
                const response = (await axios.post<ApiResponse<null>>
                    ("http://localhost:8088/profile", args)).data.message
                return response
            }
        }
    }
})