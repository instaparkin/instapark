import { GraphQLObjectType, GraphQLString, GraphQLFloat, GraphQLList, GraphQLInt } from "graphql";

export const OrderSplitType = new GraphQLObjectType({
  name: "OrderSplit",
  fields: {
    vendor_id: { type: GraphQLString },
    amount: { type: GraphQLFloat },
    percentage: { type: GraphQLInt },
    tags: { type: GraphQLString },
  },
});

export const CustomerDetailsType = new GraphQLObjectType({
  name: "CustomerDetails",
  fields: {
    customer_id: { type: GraphQLString },
    customer_name: { type: GraphQLString },
    customer_email: { type: GraphQLString },
    customer_phone: { type: GraphQLString },
    customer_uid: { type: GraphQLString },
  },
});

export const OrderMetaType = new GraphQLObjectType({
  name: "OrderMeta",
  fields: {
    return_url: { type: GraphQLString },
    notify_url: { type: GraphQLString },
    payment_methods: { type: GraphQLString },
  },
});

export const OrderType = new GraphQLObjectType({
  name: "Order",
  fields: {
    cart_details: { type: GraphQLString },
    cf_order_id: { type: GraphQLString },
    created_at: { type: GraphQLString },
    customer_details: { type: CustomerDetailsType },
    entity: { type: GraphQLString },
    order_amount: { type: GraphQLFloat },
    order_currency: { type: GraphQLString },
    order_expiry_time: { type: GraphQLString },
    order_id: { type: GraphQLString },
    order_meta: { type: OrderMetaType },
    order_note: { type: GraphQLString },
    order_splits: { type: new GraphQLList(OrderSplitType) },
    order_status: { type: GraphQLString },
    order_tags: { type: GraphQLString },
    payment_session_id: { type: GraphQLString },
    terminal_data: { type: GraphQLString },
  },
});