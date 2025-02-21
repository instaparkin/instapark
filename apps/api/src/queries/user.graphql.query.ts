import { GraphQLObjectType, GraphQLString } from "graphql";
import { ProfileType } from "../types/user.graphql.type";
import { axios } from "@instapark/utils";
import { ApiResponse, Profile } from "@instapark/types";

export const UserQuery = new GraphQLObjectType({
    name: "UserQuery",
    fields: {
        getProfile: {
            type: ProfileType,
            args: {
                userId: { type: GraphQLString },
            },
            resolve: async (parent, args) => {
                const response = (await axios.get<ApiResponse<Profile>>
                    ("http://localhost:8088/profile", {
                        params: {
                            userId: args.userId
                        }
                    })).data.data
                return response
            }
        }
    }
})