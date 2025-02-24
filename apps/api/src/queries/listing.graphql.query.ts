import { ApiResponse, Booking, Listing } from "@instapark/types";
import { axios } from "@instapark/utils";
import { GraphQLInt, GraphQLList, GraphQLObjectType, GraphQLString } from "graphql";
import { ListingType, VehicleEnum } from "../types/listing.graphql.type";
import { API_SERVER_CONSTANTS } from "../constants/api-server-constants";

export const ListingQuery = new GraphQLObjectType({
    name: "ListingQuery",
    fields: {
        searchListings: {
            type: new GraphQLList(ListingType),
            args: {
                street: { type: GraphQLString },
                vehicleType: { type: VehicleEnum },
                startDate: { type: GraphQLInt },
                endDate: { type: GraphQLInt },
            },
            resolve: async (parent, { street, vehicleType, startDate, endDate }) => {
                const bookedListings = (await axios.get<ApiResponse<Booking[]>>
                    ("http://localhost:8085/bookings", {
                        params: {
                            startDate,
                            endDate
                        }
                    })).data.data;

                const listings = (await axios.get<ApiResponse<Listing[]>>
                    ("http://localhost:8087/listings/", {
                        params: {
                            street,
                            vehicleType,
                            bookedListings
                        }
                    })).data.data;

                return listings
            }
        },
        getListings: {
            type: new GraphQLList(ListingType),
            args: {
                userId: { type: GraphQLString },
                id: { type: GraphQLString },
            },
            resolve: async (_, { id, userId }) => {
                const response = await axios.get<ApiResponse<Listing[]>>
                    (API_SERVER_CONSTANTS.ENDPOINTS.LISTINGS.GET, {
                        params: { id, userId }
                    })
                if (response.data.data) {
                    return response.data.data as Listing[]
                }
            }
        },
    }
})