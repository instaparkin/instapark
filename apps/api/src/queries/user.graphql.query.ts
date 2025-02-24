import { GraphQLObjectType, GraphQLString } from "graphql";
import { ProfileType } from "../types/user.graphql.type";
import { axios } from "@instapark/utils";
import { ApiResponse, Profile } from "@instapark/types";
import { API_SERVER_CONSTANTS } from "../constants/api-server-constants";

export const UserQuery = new GraphQLObjectType({
    name: "UserQuery",
    fields: {
        getProfile: {
            type: ProfileType,
            args: {
                userId: { type: GraphQLString },
            },
            resolve: async (_, args) => {
                const response = (await axios.get<ApiResponse<Profile>>
                    (API_SERVER_CONSTANTS.ENDPOINTS.USER.PROFILE.GET,
                        {
                            params: {
                                userId: args.userId
                            }
                        })).data.data
                return response
            }
        }
    }
})