import { GraphQLBoolean, GraphQLFloat, GraphQLInputObjectType, GraphQLInt, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";
import { axios } from "@instapark/utils";
import { ApiResponse } from "@instapark/types";
import { API_SERVER_CONSTANTS } from "../constants/api-server-constants";

export const KYCInputType = new GraphQLInputObjectType({
    name: "KYCInput",
    fields: {
        uidai: { type: GraphQLString },
        verified: { type: GraphQLBoolean }
    }
});

export const UserMutation = new GraphQLObjectType({
    name: "UserMutation",
    fields: {
        upsertProfile: {
            type: GraphQLString,
            args: {
                userId: { type: new GraphQLNonNull(GraphQLString) },
                firstName: { type: GraphQLString },
                lastName: { type: GraphQLString },
                emails: { type: new GraphQLList(GraphQLString) },
                timeJoined: { type: GraphQLInt },
                phoneNumber: { type: GraphQLString },
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
                    (API_SERVER_CONSTANTS.ENDPOINTS.USER.PROFILE.UPSERT, args)).data.message
                return response
            }
        }
    }
})