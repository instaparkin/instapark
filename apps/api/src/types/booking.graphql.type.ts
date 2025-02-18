import { GraphQLEnumType, GraphQLInt, GraphQLObjectType, GraphQLString } from "graphql";

export const BookingStatusEnum = new GraphQLEnumType({
    name: "BookingStatus",
    values: {
        Locked: { value: "Locked" },
        Booked: { value: "Booked" },
        OnGoing: { value: "OnGoing" },
        Completed: { value: "Completed" },
    }
});

export const BookingType = new GraphQLObjectType({
    name: "Booking",
    fields: {
        id: { type: GraphQLString },
        listingId: { type: GraphQLString },
        userId: { type: GraphQLString },
        startDate: { type: GraphQLInt },
        endDate: { type: GraphQLInt },
        status: { type: BookingStatusEnum },
        lockedAt: { type: GraphQLInt },
        createdAt: { type: GraphQLInt },
        updatedAt: { type: GraphQLInt },
    }
})

export const BookingOTPType = new GraphQLObjectType({
    name: "BookingOTP",
    fields: {
        bookingId: { type: GraphQLString },
        otp: { type: GraphQLInt },
        expiresAt: { type: GraphQLInt }
    }
})