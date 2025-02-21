import { GraphQLObjectType, GraphQLString } from "graphql";
import { OrderType } from "../types/order.graphql.type";
import { API_SERVER_CONSTANTS } from "../constants/api-server-constants";
import { Order } from "@instapark/types";

export const fetchOrderById = async (orderId: string): Promise<Order> => {
    const options = {
        method: 'GET',
        headers: {
            'x-api-version': API_SERVER_CONSTANTS.CASHFREE.CASHFREE_API_VERSION,
            'x-client-id': API_SERVER_CONSTANTS.CASHFREE.CASHFREE_CLIENT_ID,
            'x-client-secret': API_SERVER_CONSTANTS.CASHFREE.CASHFREE_CLIENT_SECRET
        }
    };

    try {
        const response = await fetch(`https://sandbox.cashfree.com/pg/orders/${orderId}`, options);
        if (!response.ok) {
            throw new Error(`Failed to fetch order: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        throw new Error(`Error fetching order: ${error}`);
    }
};

export const OrderQuery = new GraphQLObjectType({
    name: "OrderQuery",
    fields: {
        getOrder: {
            type: OrderType,
            args: {
                order_id: { type: GraphQLString },
            },
            resolve: async (parent, args) => {
                return await fetchOrderById(args.order_id)
            }
        }
    }
});
