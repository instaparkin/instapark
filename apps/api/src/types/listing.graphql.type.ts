import { GraphQLBoolean, GraphQLEnumType, GraphQLFloat, GraphQLInt, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";
import { ProfileType } from "./user.graphql.type";
import { axios } from "@instapark/utils";
import { ApiResponse, Booking, Profile, Review, VendorBalance } from "@instapark/types";
import { BookingStatusEnum, BookingType } from "./booking.graphql.type";
import { API_SERVER_CONSTANTS } from "../constants/api-server-constants";
import { EarningsType, VendorBalanceType } from "./vendor.graphql.type";
import { Earnings } from "@instapark/types/src/Booking";

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
        userId: { type: new GraphQLNonNull(GraphQLString) },
        type: { type: new GraphQLNonNull(PlaceTypeEnum) },
        country: { type: new GraphQLNonNull(GraphQLString) },
        state: { type: new GraphQLNonNull(GraphQLString) },
        district: { type: new GraphQLNonNull(GraphQLString) },
        city: { type: new GraphQLNonNull(GraphQLString) },
        street: { type: new GraphQLNonNull(GraphQLString) },
        pincode: { type: new GraphQLNonNull(GraphQLInt) },
        latitude: { type: new GraphQLNonNull(GraphQLFloat) },
        longitude: { type: new GraphQLNonNull(GraphQLFloat) },
        name: { type: new GraphQLNonNull(GraphQLString) },
        landmark: { type: new GraphQLNonNull(GraphQLString) },
        allowedVehicles: { type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(VehicleEnum))) },
        basePrice: { type: new GraphQLNonNull(GraphQLFloat) },
        pphbi: { type: new GraphQLNonNull(GraphQLFloat) },
        pphcy: { type: new GraphQLNonNull(GraphQLFloat) },
        pphcr: { type: new GraphQLNonNull(GraphQLFloat) },
        plph: { type: new GraphQLNonNull(GraphQLFloat) },
        photos: { type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(GraphQLString))) },
        id: { type: new GraphQLNonNull(GraphQLString) },
        isOpen: { type: new GraphQLNonNull(GraphQLBoolean) },
        rating: { type: new GraphQLNonNull(GraphQLFloat) },
        createdAt: { type: new GraphQLNonNull(GraphQLInt) },
        updatedAt: { type: new GraphQLNonNull(GraphQLInt) },
        user: {
            type: ProfileType,
            resolve: async (parent) => {
                const response = await axios.get<ApiResponse<Profile>>(
                    API_SERVER_CONSTANTS.ENDPOINTS.USER.PROFILE.GET,
                    {
                        params: { userId: parent.userId }
                    }
                );
                return response.data.data;
            }
        },
        reviews: {
            type: new GraphQLList(ReviewType),
            resolve: async (parent) => {
                const response = await axios.get<ApiResponse<Review[]>>
                    (API_SERVER_CONSTANTS.ENDPOINTS.BOOKINGS.BOOKING.GET, {
                        params: {
                            listingId: parent.id
                        }
                    })
                return response.data.data
            }
        },
    })
});
