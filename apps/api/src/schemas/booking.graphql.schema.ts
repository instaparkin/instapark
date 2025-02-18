import { GraphQLList, GraphQLObjectType, GraphQLString } from "graphql";
import { axios } from "@instapark/utils";
import { ApiResponse, Booking } from "@instapark/types";
import { BookingType } from "../types/booking.graphql.type";

export const BookingQuery = new GraphQLObjectType({
    name: "BookingQuery",
    fields: {
        getBookingsForBuyer: {
            type: new GraphQLList(BookingType),
            args: {
                userId: { type: GraphQLString }
            },
            resolve: async (parent, { userId }) => {
                const response = await axios.get<ApiResponse<Booking[]>>(`http://localhost:8085/bookings/all/`, {
                    params: { userId }
                });
                return response.data.data;
            }
        },
    }
})