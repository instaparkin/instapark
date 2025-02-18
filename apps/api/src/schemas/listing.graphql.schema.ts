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
                const bookedListings = (await axios.get<ApiResponse<Booking[]>>("http://localhost:8085/bookings", {
                    params: {
                        startDate,
                        endDate
                    }
                })).data.data

                const listings = (await axios.get<ApiResponse<Listing[]>>("http://localhost:8087/listings/",{
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
                const response = await axios.get<ApiResponse<Listing>>("http://localhost:8087/listings/", {
                    params: { id }
                })
                return response.data.data
            }
        }
    }
})

export const ListingMutation = new GraphQLObjectType({
    name: "ListingMutation",
    fields: {
        createListing: {
            type: GraphQLString,
            args: {
                userId: { type: GraphQLString },
                type: { type: PlaceTypeEnum },
                country: { type: GraphQLString },
                state: { type: GraphQLString },
                district: { type: GraphQLString },
                city: { type: GraphQLString },
                street: { type: GraphQLString },
                pincode: { type: GraphQLInt },
                latitude: { type: GraphQLFloat },
                longitude: { type: GraphQLFloat },
                name: { type: GraphQLString },
                landmark: { type: GraphQLString },
                allowedVehicles: { type: new GraphQLList(VehicleEnum) },
                basePrice: { type: GraphQLFloat },
                pphbi: { type: GraphQLFloat },
                pphcy: { type: GraphQLFloat },
                pphcr: { type: GraphQLFloat },
                plph: { type: GraphQLFloat },
                photos: { type: new GraphQLList(GraphQLString) },
            },
            resolve: async (parent, args: ListingRequest) => {
                const response = await axios.post<ApiResponse<Listing>>
                    ("http://localhost:8087/listings/create",
                        args)

                return response.data.message
            }
        },
        updateListing: {
            type: GraphQLString,
            args: {
                id: { type: GraphQLString },
                userId: { type: GraphQLString },
                type: { type: PlaceTypeEnum },
                country: { type: GraphQLString },
                state: { type: GraphQLString },
                district: { type: GraphQLString },
                city: { type: GraphQLString },
                street: { type: GraphQLString },
                pincode: { type: GraphQLInt },
                latitude: { type: GraphQLFloat },
                longitude: { type: GraphQLFloat },
                name: { type: GraphQLString },
                landmark: { type: GraphQLString },
                allowedVehicles: { type: new GraphQLList(VehicleEnum) },
                basePrice: { type: GraphQLFloat },
                pphbi: { type: GraphQLFloat },
                pphcy: { type: GraphQLFloat },
                pphcr: { type: GraphQLFloat },
                plph: { type: GraphQLFloat },
                photos: { type: new GraphQLList(GraphQLString) },
            },

            resolve: async (parent, args) => {
                const response = await axios.put<ApiResponse<Listing>>
                    ("http://localhost:8087/listings/update/" + args.id, args)
                return response.data.message
            }
        },
        deleteListing: {
            type: GraphQLString,
            args: {
                id: { type: GraphQLString },
            },
            resolve: async (parent, args) => {
                const response = await axios.delete<ApiResponse<Listing>>
                    ("http://localhost:8087/listings/delete/" + args.id)
                return response.data.message
            }
        }
    }
})