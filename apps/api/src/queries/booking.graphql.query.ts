import { GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";
import { axios } from "@instapark/utils";
import { ApiResponse, Booking, BookingStatus, Listing } from "@instapark/types";
import { ListingType } from "../types/listing.graphql.type";
import { API_SERVER_CONSTANTS } from "../constants/api-server-constants";
import { BookingStatusEnum, BookingType } from "../types/booking.graphql.type";

export const BookingQuery = new GraphQLObjectType({
    name: "BookingQuery",
    fields: {
        buyerBookings: {
            type: new GraphQLList(
                new GraphQLObjectType({
                    name: "BookingsBuyer",
                    fields: () => ({
                        booking: { type: BookingType },
                        listing: {
                            type: ListingType,
                            resolve: async (parent) => {
                                const response = await axios.get<ApiResponse<Listing[]>>
                                    (API_SERVER_CONSTANTS.ENDPOINTS.LISTINGS.LISTING.GET, {
                                        params: {
                                            id: parent.booking.listingId
                                        }
                                    })
                                if (response.data.data) {
                                    return response?.data?.data[0] as Listing
                                }
                            }
                        }
                    })
                })
            ),
            args: {
                userId: { type: GraphQLString },
                id: { type: GraphQLString },
                status: { type: BookingStatusEnum }
            },
            resolve: async (_, { userId, id, status }: { userId: string, id: string, status: BookingStatus }) => {
                const response = await axios.get<ApiResponse<Booking[]>>
                    (API_SERVER_CONSTANTS.ENDPOINTS.BOOKINGS.BOOKING.GET, {
                        params: {
                            userId,
                            id,
                            status
                        }
                    });
                return response.data.data?.map(b => {
                    return {
                        booking: b
                    }
                })
            }
        },
    }
});
