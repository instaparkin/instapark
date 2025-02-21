import { GraphQLBoolean, GraphQLEnumType, GraphQLFloat, GraphQLInt, GraphQLList, GraphQLObjectType, GraphQLString } from "graphql";
import { ProfileType } from "./user.graphql.type";
import { axios } from "@instapark/utils";
import { ApiResponse, Booking, Profile } from "@instapark/types";
import { BookingStatusEnum, BookingType, EarningsType } from "./booking.graphql.type";
import { Earnings } from "@instapark/types/src/Booking";

export const PlaceTypeEnum = new GraphQLEnumType({
    name: "PlaceType",
    values: {
        House: { value: "House" },
        Barn: { value: "Barn" },
        Cabin: { value: "Cabin" },
        Castle: { value: "Castle" },
        Hotel: { value: "Hotel" },
        Farm: { value: "Farm" },
    }
})

export const VehicleEnum = new GraphQLEnumType({
    name: "Vehicle",
    values: {
        Car: { value: "Car" },
        Bike: { value: "Bike" },
        Cycle: { value: "Cycle" },
    }
})
export const ListingType = new GraphQLObjectType({
    name: "Listing",
    fields: () => ({
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
        id: { type: GraphQLString },
        isOpen: { type: GraphQLBoolean },
        rating: { type: GraphQLFloat },
        createdAt: { type: GraphQLInt },
        updatedAt: { type: GraphQLInt },
        earnings: {
            type: EarningsType,
            resolve: async (parent) => {
                const response = await axios.get<ApiResponse<Earnings>>(
                    "http://localhost:8085/bookings/earnings",
                    {
                        params: { listingIds: [parent.id] }
                    }
                );
                return response.data.data;
            }
        },
        user: {
            type: ProfileType,
            resolve: async (parent) => {
                const response = await axios.get<ApiResponse<Profile>>(
                    "http://localhost:8088/profile",
                    {
                        params: { userId: parent.userId }
                    }
                );
                return response.data.data;
            }
        },
    })
});

export const ReviewType = new GraphQLObjectType({
    name: "Review",
    fields: {
        id: { type: GraphQLString },
        listingId: { type: GraphQLString },
        userId: { type: GraphQLString },
        rating: { type: GraphQLFloat },
        location: { type: GraphQLFloat },
        cleanliness: { type: GraphQLFloat },
        communication: { type: GraphQLFloat },
        value: { type: GraphQLFloat },
        accuracy: { type: GraphQLFloat },
        description: { type: GraphQLString },
        createdAt: { type: GraphQLInt },
        updatedAt: { type: GraphQLInt }
    }
})

export const LikedListingType = new GraphQLObjectType({
    name: "LikedListing",
    fields: {
        id: { type: GraphQLString },
        listingId: { type: GraphQLString },
        userId: { type: GraphQLString },
    }
})