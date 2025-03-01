import { GraphQLBoolean, GraphQLEnumType, GraphQLFloat, GraphQLInt, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";
import { ProfileType } from "./user.graphql.type";
import { axios } from "@instapark/utils";
import { ApiResponse, Profile } from "@instapark/types";
import { API_SERVER_CONSTANTS } from "../constants/api-server-constants";

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

export function formatPrice(value: number | string) {
    return `₹${value}`
}

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
        pphbi: { type: GraphQLFloat },
        pphcy: { type: GraphQLFloat },
        pphcr: { type: GraphQLFloat },
        plph: { type: new GraphQLNonNull(GraphQLFloat) },
        photos: { type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(GraphQLString))) },
        id: { type: new GraphQLNonNull(GraphQLString) },
        isOpen: { type: new GraphQLNonNull(GraphQLBoolean) },
        createdAt: { type: new GraphQLNonNull(GraphQLInt) },
        updatedAt: { type: new GraphQLNonNull(GraphQLInt) },
        calulator: {
            type: new GraphQLObjectType({
                name: "PricingCalulator",
                fields: {
                    hourly: { type: new GraphQLNonNull(GraphQLFloat) },
                    vehicles: {
                        type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(VehicleEnum))),
                    },
                    items: {
                        type: new GraphQLNonNull(new GraphQLList(new GraphQLObjectType({
                            name: "PricingItems",
                            fields: {
                                field: { type: GraphQLString },
                                value: { type: GraphQLString }, // Ensure all values are strings
                                separator: { type: GraphQLBoolean }
                            }
                        })))
                    }
                },
            }),
            args: {
                startDate: { type: GraphQLInt }, // Unix timestamp in SECONDS
                endDate: { type: GraphQLInt },
                vehicle: { type: VehicleEnum }
            },
            resolve: async (parent, { startDate, endDate, vehicle }) => {

                const hourlyRate = () => {
                    switch (vehicle) {
                        case "Bike":
                            return parent.pphbi ?? 0;
                        case "Cycle":
                            return parent.pphcy ?? 0;
                        case "Car":
                            return parent.pphcr ?? 0;
                        default:
                            return 0;
                    }
                };

                const hours = () => {
                    const start = new Date(startDate * 1000);
                    const end = new Date(endDate * 1000);
                    return (end.getTime() - start.getTime()) / 3600000;
                };

                const parkingPrice = () => {
                    return hourlyRate() * hours();
                };

                const ipFee = () => {
                    return (parent.basePrice ?? 0 + parkingPrice()) * 0.3;
                };

                const totalPrice = () => {
                    return (parent.basePrice ?? 0) + parkingPrice() + ipFee();
                };
                /**
                 * This is of the type of Details Component
                 */
                return {
                    vehicles: parent.allowedVehicles ?? [],
                    hourly: hourlyRate(),
                    items: [
                        { field: "Base Price", value: (parent.basePrice ?? 0).toFixed(2) },
                        { field: `${hours().toFixed(2)} hours x ${hourlyRate()}`, value: parkingPrice().toFixed(2) },
                        { field: "Instapark Fee (30%)", value: ipFee().toFixed(2) },
                        { field: "Penalty Per Hour", value: (parent.plph ?? 0).toFixed(2) },
                        { field: "Total", value: totalPrice().toFixed(2), separator: true },
                    ]
                };
            }
        },
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
    })
});
