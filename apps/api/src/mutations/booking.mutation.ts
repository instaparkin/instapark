import {
    GraphQLFloat,
    GraphQLInputObjectType,
    GraphQLInt,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLString
} from "graphql";
import axios from "axios";
import { ApiResponse, Listing, LockedResponse, Profile } from "@instapark/types";
import { API_SERVER_CONSTANTS } from "../constants/api-server-constants";
import { VehicleEnum } from "../types/listing.graphql.type";

export const BookingMutation = new GraphQLObjectType({
    name: "BookingMutation",
    fields: {
        lock: {
            type: new GraphQLObjectType({
                name: "LockResponse",
                fields: {
                    bookingId: { type: GraphQLString },
                    orderId: { type: GraphQLString },
                    payment_session_id: { type: GraphQLString },
                    message: { type: GraphQLString }
                }
            }),
            args: {
                listingId: { type: new GraphQLNonNull(GraphQLString) },
                userId: { type: new GraphQLNonNull(GraphQLString) },
                startDate: { type: new GraphQLNonNull(GraphQLInt) },
                endDate: { type: new GraphQLNonNull(GraphQLInt) },
                basePrice: { type: new GraphQLNonNull(GraphQLFloat) },
                parkingPrice: { type: new GraphQLNonNull(GraphQLFloat) },
                totalPrice: { type: new GraphQLNonNull(GraphQLFloat) },
                vehicle: { type: VehicleEnum },
                ipFee: { type: new GraphQLNonNull(GraphQLFloat) },
                customer: {
                    type: new GraphQLInputObjectType({
                        name: "LockCustomer",
                        fields: {
                            customer_email: { type: GraphQLString },
                            customer_name: { type: GraphQLString },
                            customer_phone: { type: GraphQLString },
                        }
                    })
                },
                vendor_id: { type: GraphQLString }
            },
            resolve: async (_parent, args) => {
                try {
                    const bookingResponse = await axios.post<ApiResponse<LockedResponse>>(
                        API_SERVER_CONSTANTS.ENDPOINTS.BOOKINGS.BOOKING.LOCK, args
                    );

                    return {
                        ...bookingResponse.data?.data,
                        message: bookingResponse.data?.message ?? "No message received"
                    };
                } catch (error) {
                    return {
                        bookingId: null,
                        orderId: null,
                        payment_session_id: null,
                        message: `Booking failed: ${error instanceof Error ? error.message : "Unknown error"}`
                    };
                }
            }
        },
        verifyOTP: {
            type: GraphQLString,
            args: {
                bookingId: { type: new GraphQLNonNull(GraphQLString) },
                otp: { type: new GraphQLNonNull(GraphQLInt) }
            },
            resolve: async (_, { bookingId, otp }) => {
                try {
                    const response = await axios.post<ApiResponse<null>>(
                        API_SERVER_CONSTANTS.ENDPOINTS.BOOKINGS.BOOKING.VERIFY,
                        { bookingId, otp }
                    );
                    return response.data.message;
                } catch (error) {
                    if (axios.isAxiosError(error) && error.response) {
                        return error.response.data.message;
                    }
                    return "An unexpected error occurred";
                }
            }
        },
        complete: {
            type: GraphQLString,
            args: {
                bookingId: { type: GraphQLString },
                orderId: { type: GraphQLString },
                userId: { type: GraphQLString },
            },
            resolve: async (_, args) => {
                try {
                    const response = await axios.post<ApiResponse<null>>
                        (API_SERVER_CONSTANTS.ENDPOINTS.BOOKINGS.BOOKING.COMPLETE, args);
                    return response.data.message
                } catch (error) {
                    if (axios.isAxiosError(error) && error.response) {
                        return error.response.data.message;
                    }
                    return "An unexpected error occurred";
                }
            }
        }
    }
});
