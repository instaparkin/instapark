import { GraphQLEnumType, GraphQLInt, GraphQLObjectType, GraphQLString } from "graphql";

export const PaymentTypeEnum = new GraphQLEnumType({
    name: "PaymentType",
    values: {
        Booking: { value: "Booking" },
        Completed: { value: "Completed" },
    }
})

export const PaymentType = new GraphQLObjectType({
    name: "Payment",
    fields: {
        bookingId: { type: GraphQLString },
        userId: { type: GraphQLString },
        orderId: { type: GraphQLString },
        cfPaymentId: { type: GraphQLString },
        paymentType: { type: PaymentTypeEnum },
        createdAt: { type: GraphQLInt },
        updatedAt: { type: GraphQLInt },
    }
})