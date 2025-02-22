import { ApiResponse } from "@instapark/types";
import { axios } from "@instapark/utils";
import { GraphQLFloat, GraphQLInputObjectType, GraphQLObjectType, GraphQLString } from "graphql";

export const VendorBankInput = new GraphQLInputObjectType({
    name: "VendorBankInput",
    fields: {
        account_number: { type: GraphQLString },
        account_holder: { type: GraphQLString },
        ifsc: { type: GraphQLString }
    }
})

export const VendorKYCInput = new GraphQLInputObjectType({
    name: "VendorKYCInput",
    fields: {
        pan: { type: GraphQLString }
    }
})

export const VendorMutation = new GraphQLObjectType({
    name: "VendorMutation",
    fields: {
        createVendor: {
            type: GraphQLString,
            args: {
                name: { type: GraphQLString },
                email: { type: GraphQLString },
                phone: { type: GraphQLString },
                bank: { type: VendorBankInput },
                kyc_details: { type: VendorKYCInput },
                vendor_id: { type: GraphQLString },
            },
            resolve: async (parent, args) => {
                const response = (await axios.post<ApiResponse<null>>
                    ("http://localhost:8085/vendor", args)).data.message;
                return response
            }
        },
        createTransfer: {
            type: GraphQLString,
            args: {
                vendorId: { type: GraphQLString },
                transfer_amount: { type: GraphQLFloat },
            },
            resolve: async (parent, args) => {
                const response = await axios.post<ApiResponse<null>>
                    ("http://localhost:8085/vendor/transfer", args)
                return response.data.message
            }
        }
    }
})