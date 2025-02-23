import { GraphQLObjectType, GraphQLString } from "graphql";
import axios from "axios";
import { ApiResponse } from "@instapark/types";

export const AuthQuery = new GraphQLObjectType({
    name: "AuthQuery",
    fields: {
        verifyUser: {
            type: new GraphQLObjectType({
                name: "UserId",
                fields: {
                    userId: { type: GraphQLString }
                }
            }),
            resolve: async () => {
                const response = await axios.get<ApiResponse<{ userId: string }>>
                    ("")
            }
        }
    }
})