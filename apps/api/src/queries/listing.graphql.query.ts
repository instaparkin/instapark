import { ApiResponse, Booking, Listing, ListingRequest } from "@instapark/types";
import { axios } from "@instapark/utils";
import { GraphQLFloat, GraphQLInt, GraphQLList, GraphQLObjectType, GraphQLString } from "graphql";
import { ListingType, PlaceTypeEnum, VehicleEnum } from "../types/listing.graphql.type";

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
        getListingsForHost: {
            type: new GraphQLList(ListingType),
            args: {
                userId: { type: GraphQLString }
            },
            resolve: async (parent, { userId }) => {
                const response = await axios.get<ApiResponse<Listing>>("http://localhost:8087/listings/", {
                    params: { userId }
                })
                return response.data.data
            }
        },
        getListingById: {
            type: ListingType,
            args: {
                id: { type: GraphQLString }
            },
            resolve: async (parent, { id }) => {
                const response = await axios.get<ApiResponse<Listing[]>>("http://localhost:8087/listings/", {
                    params: { id }
                })

                if (response.data.data) {
                    return response.data.data[0] as Listing
                }
            }
        }
    }
})