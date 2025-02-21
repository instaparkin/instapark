import { GraphQLObjectType, GraphQLString } from "graphql";
import { VendorBalance, VendorType } from "../types/vendor.graphql.type";
import { axios } from "@instapark/utils";
import { ApiResponse, Vendor } from "@instapark/types";

export const VendorQuery = new GraphQLObjectType({
    name: "VendorQuery",
    fields: {
        getVendor: {
            type: VendorType,
            args: {
                vendorId: { type: GraphQLString }
            },
            resolve: async (parent, args) => {
                const response = (await axios.get
                    <ApiResponse<Vendor>>
                    ("http://localhost:8085/vendor", {
                        params: {
                            userId: args.vendorId
                        }
                    })).data.data
                return response
            }
        },
        getVendorBalance: {
            type: VendorBalance,
            args: {
                vendorId: { type: GraphQLString }
            },
            resolve: async (parent, args) => {
                const response = (await axios.get
                    <ApiResponse<Vendor>>
                    ("http://localhost:8085/settlements/balance", {
                        params: {
                            vendorId: args.vendorId
                        }
                    })).data.data
                return response
            }
        }
    }
})