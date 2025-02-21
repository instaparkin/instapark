import { GraphQLFloat, GraphQLInt, GraphQLList, GraphQLObjectType, GraphQLString } from "graphql"
import { LikedListingType, PlaceTypeEnum, VehicleEnum } from "../types/listing.graphql.type"
import { ApiResponse, LikedListing, Listing, ListingRequest } from "@instapark/types"
import { axios } from "@instapark/utils"

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
                    ("http://localhost:8087/listings/",
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
        },
        createLikedListing: {
            type: GraphQLString,
            args: {
                userId: { type: GraphQLString },
                listingId: { type: GraphQLString },
            },
            resolve: async (parent, args) => {
                const response = await axios.post<ApiResponse<LikedListing>>
                    ("http://localhost:8088/liked-listings/", args)
                return response.data.message
            },
        },
        deleteLikedListing: {
            type: GraphQLString,
            args: {
                id: { type: GraphQLString },
            },
            resolve: async (parent, { id }) => {
                const response = await axios.delete<ApiResponse<null>>
                    ("http://localhost:8088/liked-listings/", {
                        params: {
                            id,
                        }
                    })
                return response.data.message
            },
        }
    }
})