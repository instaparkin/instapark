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
                ipFee: { type: new GraphQLNonNull(GraphQLFloat) },
            },
            resolve: async (_parent, args) => {
                try {
                    const customerResponse = await axios.get<ApiResponse<Profile>>(
                        API_SERVER_CONSTANTS.ENDPOINTS.USER.PROFILE.GET,
                        { params: { userId: args.userId } }
                    );

                    const customer = customerResponse.data?.data;
                    if (!customer) {
                        throw new Error("Customer profile not found");
                    }

                    const vendorResponse = await axios.get<ApiResponse<Listing>>(
                        API_SERVER_CONSTANTS.ENDPOINTS.LISTINGS.GET,
                        { params: { id: args.listingId } }
                    );

                    const vendor = vendorResponse.data?.data;
                    if (!vendor) {
                        throw new Error("Listing not found");
                    }

                    const bookingResponse = await axios.post<ApiResponse<LockedResponse>>(
                        "http://localhost:8085/bookings/lock",
                        {
                            ...args,
                            customer: {
                                customer_name: `${customer.firstName} ${customer.lastName}`,
                                customer_email: customer.emails?.[0] ?? "",
                                customer_phone: customer.phoneNumber ?? "",
                            },
                            vendor_id: vendor.id
                        }
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
        }
    }
});
