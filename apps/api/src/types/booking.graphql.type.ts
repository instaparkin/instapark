import { GraphQLEnumType, GraphQLFloat, GraphQLInt, GraphQLList, GraphQLObjectType, GraphQLString } from "graphql";
import { ListingType } from "./listing.graphql.type";
import { OrderType } from "./order.graphql.type";
import { axios } from "@instapark/utils";
import { ApiResponse, Payment } from "@instapark/types";
import { fetchOrderById } from "../utils/fetch-order-by-id";

export const PaymentTypeEnum = new GraphQLEnumType({
    name: "PaymentType",
    values: {
        Booking: { value: "Booked" },
        Completed: { value: "Completed" },
    }
})

export const PaymentType = new GraphQLObjectType({
    name: "Payment",
    fields: {
        bookingId: { type: GraphQLString },
        userId: { type: GraphQLString },
        orderId: { type: GraphQLString },
        paymentType: { type: PaymentTypeEnum },
        createdAt: { type: GraphQLInt },
        updatedAt: { type: GraphQLInt },
        order: {
            type: OrderType,
            resolve: async (parent) => {
                return await fetchOrderById(parent.orderId)
            }
        }
    }
})

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
        basePrice: { type: GraphQLFloat },
        parkingPrice: { type: GraphQLFloat },
        totalPrice: { type: GraphQLFloat },
        ipFee: { type: GraphQLFloat },
        penalty: { type: GraphQLFloat },
        createdAt: { type: GraphQLInt },
        updatedAt: { type: GraphQLInt },
        payments: {
            type: new GraphQLList(PaymentType),
            resolve: async (parent) => {
                const response = await axios.get<ApiResponse<Payment[]>>
                    ("http://localhost:8085/payments", {
                        params: {
                            bookingId: parent.id
                        }
                    })
                return response.data.data
            }
        }
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

export const BookingExtendedType = new GraphQLObjectType({
    name: "BookingExtended",
    fields: {
        id: { type: GraphQLString },
        listingId: { type: GraphQLString },
        userId: { type: GraphQLString },
        startDate: { type: GraphQLInt },
        endDate: { type: GraphQLInt },
        status: { type: BookingStatusEnum },
        lockedAt: { type: GraphQLInt },
        basePrice: { type: GraphQLFloat },
        parkingPrice: { type: GraphQLFloat },
        totalPrice: { type: GraphQLFloat },
        ipFee: { type: GraphQLFloat },
        penalty: { type: GraphQLFloat },
        createdAt: { type: GraphQLInt },
        updatedAt: { type: GraphQLInt },
        listing: {
            type: ListingType
        },
    }
})

export const EarningsType = new GraphQLObjectType({
    name: "Earnings",
    fields: {
        currentMonth: {
            type: new GraphQLObjectType({
                name: "CurrentMonth",
                fields: {
                    totalBookings: { type: GraphQLInt },
                    totalRevenue: { type: GraphQLFloat },
                    totalNetProfit: { type: GraphQLFloat },
                    avgBookingValue: { type: GraphQLFloat },
                },
            }),
        },
        previousMonth: {
            type: new GraphQLObjectType({
                name: "PreviousMonth",
                fields: {
                    totalBookings: { type: GraphQLInt },
                    totalRevenue: { type: GraphQLFloat },
                    totalNetProfit: { type: GraphQLFloat },
                    avgBookingValue: { type: GraphQLFloat },
                },
            }),
        },
        netPL: {
            type: new GraphQLObjectType({
                name: "NetPL",
                fields: {
                    totalBookingsPLPercent: { type: GraphQLFloat },
                    totalRevenuePLPercent: { type: GraphQLFloat },
                    totalNetProfitPLPercent: { type: GraphQLFloat },
                    avgBookingValuePLPercent: { type: GraphQLFloat },
                },
            }),
        },
        timeRangeData: {
            type: new GraphQLList(new GraphQLObjectType({
                name: "TimeRangeData",
                fields: {
                    date: { type: GraphQLString },
                    totalPrice: { type: GraphQLFloat },
                },
            })),
        },
    },
})