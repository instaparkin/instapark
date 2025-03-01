import { GraphQLEnumType, GraphQLFloat, GraphQLInt, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";
import { axios } from "@instapark/utils";
import { ApiResponse, BookingOTP, Payment, Profile } from "@instapark/types";
import { fetchOrderById } from "../utils/fetch-order-by-id";
import { API_SERVER_CONSTANTS } from "../constants/api-server-constants";
import { ProfileType } from "./user.graphql.type";
import { VehicleEnum } from "./listing.graphql.type";

export const BookingOrderSplitType = new GraphQLObjectType({
    name: "BookingOrderSplit",
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
        order_splits: { type: new GraphQLList(BookingOrderSplitType) },
        order_status: { type: GraphQLString },
        order_tags: { type: GraphQLString },
        payment_session_id: { type: GraphQLString },
        terminal_data: { type: GraphQLString },
    },
});

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

export const BookingOTPType = new GraphQLObjectType({
    name: "BookingOTP",
    fields: {
        bookingId: { type: GraphQLString },
        otp: { type: GraphQLInt },
        expiresAt: { type: GraphQLInt }
    }
})

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
        vehicle: { type: VehicleEnum },
        createdAt: { type: GraphQLInt },
        updatedAt: { type: GraphQLInt },
        user: {
            type: ProfileType,
            resolve: async (parent) => {
                const response = await axios.get<ApiResponse<Profile>>
                    (API_SERVER_CONSTANTS.ENDPOINTS.USER.PROFILE.GET,
                        {
                            params: {
                                userId: parent.userId
                            }
                        })
                return response.data.data
            }
        },
        payments: {
            type: new GraphQLList(PaymentType),
            resolve: async (parent) => {
                const response = await axios.get<ApiResponse<Payment[]>>
                    (API_SERVER_CONSTANTS.ENDPOINTS.BOOKINGS.PAYMENTS.GET, {
                        params: {
                            bookingId: parent.id
                        }
                    })
                return response.data.data
            }
        },
        otp: {
            type: BookingOTPType,
            resolve: async (parent) => {
                const response = await axios.get<ApiResponse<BookingOTP>>
                    (API_SERVER_CONSTANTS.ENDPOINTS.BOOKINGS.BOOKING.OTP, {
                        params: {
                            bookingId: parent.id
                        }
                    })
                return response.data.data
            }
        }
    }
})

export const BookedResponseType = new GraphQLObjectType({
    name: "BookedResponse",
    fields: {
        otp: { type: new GraphQLNonNull(GraphQLInt) }
    }
})