import { GraphQLFloat, GraphQLInt, GraphQLList, GraphQLObjectType, GraphQLString } from "graphql";
import { axios } from "@instapark/utils";
import { ApiResponse, Booking, Listing, Payment, Vendor } from "@instapark/types";
import { BookingExtendedType, BookingStatusEnum, EarningsType, PaymentType } from "../types/booking.graphql.type";
import { ListingType } from "../types/listing.graphql.type";
import { Earnings } from "@instapark/types/src/Booking";
import { VendorBalance } from "../types/vendor.graphql.type";
import { API_SERVER_CONSTANTS } from "../constants/api-server-constants";

export const BookingQuery = new GraphQLObjectType({
    name: "BookingQuery",
    fields: {
        getBookingsForBuyer: {
            type: new GraphQLList(
                new GraphQLObjectType({
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
                        createdAt: { type: GraphQLInt },
                        updatedAt: { type: GraphQLInt },
                        listing: {
                            type: ListingType,
                            resolve: async (parent) => {
                                const response = await axios.get<ApiResponse<Listing[]>>
                                    ("http://localhost:8087/listings", {
                                        params: {
                                            id: parent.listingId
                                        }
                                    })
                                return response.data.data[0] as Listing
                            }
                        },
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
            ),
            args: {
                userId: { type: GraphQLString },
                id: { type: GraphQLString }
            },
            resolve: async (parent, { userId, id }) => {
                const response = await axios.get<ApiResponse<Booking[]>>
                    (`http://localhost:8085/bookings/`, {
                        params: {
                            userId,
                            id
                        }
                    });
                return response.data.data;
            }
        },
        getBookingsForHost: {
            type: new GraphQLList(BookingExtendedType),
            args: {
                userId: { type: GraphQLString },
                status: { type: BookingStatusEnum }
            },
            resolve: async (_, { status, userId }) => {
                const bookingsResponse = await axios.get<ApiResponse<Booking[]>>
                    (`http://localhost:8085/bookings/`, {
                        params: { status }
                    });

                const bookings = bookingsResponse.data.data as Booking[];

                return Promise.all(
                    bookings.map(async (b) => {
                        const listingsResponse = await axios.get<ApiResponse<Listing[]>>
                            (`http://localhost:8087/listings/`, {
                                params: { id: b.listingId }
                            });

                        return {
                            ...b,
                            listing: listingsResponse.data.data?.at(0) || null
                        };
                    })
                );
            }
        },
        getPaymentsForBuyer: {
            type: new GraphQLList(PaymentType),
            args: {
                userId: { type: GraphQLString },
            },
            resolve: async (parent, args) => {
                const response = await axios.get<ApiResponse<Payment[]>>
                    (`http://localhost:8085/payments/`, {
                        params: {
                            bookingId: args.bookingId,
                            userId: args.userId,
                            orderId: args.orderId,
                            paymentType: args.paymentType
                        }
                    });
                return response.data.data;
            }
        },
        getEarningsStats: {
            type: EarningsType,
            args: {
                userId: { type: GraphQLString },
            },
            resolve: async (_, { userId }) => {
                const listings = await axios.get<ApiResponse<Listing[]>>
                    (API_SERVER_CONSTANTS.ENDPOINTS.LISTINGS.GET, {
                        params: { userId }
                    })
                const response = await axios.get<ApiResponse<Earnings>>
                    (API_SERVER_CONSTANTS.ENDPOINTS.BOOKINGS.BOOKING.EARNING_STATS, {
                        params: {
                            listingIds: listings.data.data?.map(l => l.id)
                        }
                    })
                return response.data.data
            }
        },
        getEarningsDashboard: {
            type: new GraphQLObjectType({
                name: "EarningsDashboard",
                fields: {
                    earnings: {
                        type: EarningsType,
                        args: {
                            userId: { type: GraphQLString },
                            timeRange: { type: GraphQLString }
                        },
                        resolve: async (parent, { userId }) => {
                            try {
                                const listings = await axios.get<ApiResponse<Listing[]>>(
                                    "http://localhost:8087/listings/",
                                    { params: { userId } }
                                );

                                const listingIds = listings.data.data?.map(l => l.id) ?? [];

                                if (listingIds.length === 0) {
                                    return null;
                                }

                                const response = await axios.get<ApiResponse<Earnings>>(
                                    "http://localhost:8085/bookings/earnings",
                                    { params: { listingIds } }
                                );

                                return response.data.data;
                            } catch (error) {
                                console.error("Error fetching earnings:", error);
                                throw new Error("Failed to fetch earnings");
                            }
                        }
                    },
                    vendorBalance: {
                        type: VendorBalance,
                        args: {
                            vendorId: { type: GraphQLString }
                        },
                        resolve: async (parent, { vendorId }) => {
                            try {
                                const response = await axios.get<ApiResponse<Vendor>>(
                                    "http://localhost:8085/vendor/balance",
                                    { params: { vendorId } }
                                );

                                return response.data.data;
                            } catch (error) {
                                console.error("Error fetching vendor balance:", error);
                                throw new Error("Failed to fetch vendor balance");
                            }
                        }
                    }
                },
            }),
            resolve: () => ({})
        },
    }
});
