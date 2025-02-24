import { GraphQLObjectType, GraphQLString } from "graphql";
import { OrderType } from "../types/order.graphql.type";
import { fetchOrderById } from "../utils/fetch-order-by-id";

export const OrderQuery = new GraphQLObjectType({
    name: "OrderQuery",
    fields: {
        getOrder: {
            type: OrderType,
            args: {
                order_id: { type: GraphQLString },
            },
            resolve: async (_, args) => {
                return await fetchOrderById(args.order_id)
            }
        }
    }
});
