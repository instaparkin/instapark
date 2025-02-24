import { GraphQLFloat, GraphQLInt, GraphQLList, GraphQLObjectType, GraphQLString } from "graphql";
import { VendorType } from "../types/vendor.graphql.type";
import { axios } from "@instapark/utils";
import { ApiResponse, Transaction, Vendor, VendorCommission } from "@instapark/types";
import { OrderSplitType } from "../types/order.graphql.type";
import { API_SERVER_CONSTANTS } from "../constants/api-server-constants";

export const VendorQuery = new GraphQLObjectType({
    name: "VendorQuery",
    fields: {
        getVendor: {
            type: VendorType,
            args: {
                vendorId: { type: GraphQLString }
            },
            resolve: async (_,args) => {
                const response = (await axios.get<ApiResponse<Vendor>>
                    (API_SERVER_CONSTANTS.ENDPOINTS.BOOKINGS.VENDOR.GET, {
                        params: {
                            userId: args.vendorId
                        }
                    })).data.data
                return response
            }
        },
        getTransactions: {
            type: new GraphQLList(new GraphQLObjectType({
                name: "Transaction",
                fields: {
                    amount: { type: (GraphQLFloat) },
                    merchant_order_id: { type: (GraphQLString) },
                    tx_time: { type: GraphQLString },
                    settled: { type: GraphQLString },
                    entity_id: { type: GraphQLString },
                    currency: { type: GraphQLString },
                    sale_type: { type: GraphQLString },
                    customer_email: { type: GraphQLString },
                    customer_phone: { type: GraphQLString },
                    added_on: { type: GraphQLString },
                    entity_type: { type: GraphQLString },
                    settlement_eligibility_time: { type: GraphQLString },
                    merchant_settlement_utr: { type: GraphQLString },
                    payment_utr: { type: GraphQLString },
                    merchant_vendor_commission: { type: GraphQLString },
                    split_service_charge: { type: GraphQLString },
                    split_service_tax: { type: GraphQLString },
                    pg_service_tax: { type: GraphQLString },
                    pg_service_charge: { type: GraphQLString },
                    pg_charge_postpaid: { type: GraphQLString },
                    merchant_settlement_id: { type: GraphQLString },
                    tags: { type: GraphQLString },
                    settlement_initiated_on: { type: GraphQLString },
                    settlement_time: { type: GraphQLString },
                    eligible_split_balance: { type: GraphQLString },
                    order_splits: { type: new GraphQLList(OrderSplitType) },
                    merchant_vendor_id: { type: GraphQLString },
                    vendor_settlement_time: { type: GraphQLString },
                    vendor_settlement_initiated_on: { type: GraphQLString },
                    vendor_settlement_eligibility_time: { type: GraphQLString },
                    vendor_settlement_id: { type: GraphQLString },
                    vendor_commission: { type: GraphQLString },
                    vendor_pg_service_charge: { type: GraphQLString },
                    vendor_pg_service_tax: { type: GraphQLString },
                    status: { type: GraphQLString },
                }
            })),
            args: {
                orderIds: { type: new GraphQLList(GraphQLString) },
                limit: { type: GraphQLInt },
                entity_type: { type: GraphQLString },
            },
            resolve: async (parent, { orderIds, limit, entity_type }) => {
                const response = await axios.get<ApiResponse<Transaction | VendorCommission[]>>
                    ("http://localhost:8085/settlements", {
                        params: {
                            orderIds,
                            limit,
                            entity_type
                        }
                    })
                return response.data.data
            }
        },
    }
})