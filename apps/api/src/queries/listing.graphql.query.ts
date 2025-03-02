import { ApiResponse, Booking, Listing } from '@instapark/types';
import { axios } from '@instapark/utils';
import {
	GraphQLInt,
	GraphQLList,
	GraphQLNonNull,
	GraphQLObjectType,
	GraphQLString,
} from 'graphql';
import { ListingType, VehicleEnum } from '../types/listing.graphql.type';
import { API_SERVER_CONSTANTS } from '../constants/api-server-constants';
import { BookingStatusEnum, BookingType } from '../types/booking.graphql.type';

export const ListingQuery = new GraphQLObjectType({
	name: 'ListingQuery',
	fields: {
		searchListings: {
			type: new GraphQLList(ListingType),
			args: {
				street: { type: GraphQLString },
				vehicleType: { type: VehicleEnum },
				startDate: { type: GraphQLInt },
				endDate: { type: GraphQLInt },
			},
			resolve: async (_, { street, vehicleType, startDate, endDate }) => {
				const bookedListings = (
					await axios.get<ApiResponse<Booking[]>>(
						API_SERVER_CONSTANTS.ENDPOINTS.BOOKINGS.BOOKING.GET,
						{
							params: {
								startDate,
								endDate,
							},
						},
					)
				).data.data;

				const listings = (
					await axios.get<ApiResponse<Listing[]>>(
						API_SERVER_CONSTANTS.ENDPOINTS.LISTINGS.LISTING.GET,
						{
							params: {
								street,
								vehicleType,
								bookedListings,
							},
						},
					)
				).data.data;

				return listings;
			},
		},
		hostListings: {
			type: new GraphQLList(ListingType),
			args: {
				userId: { type: GraphQLString },
				id: { type: GraphQLString },
			},
			resolve: async (_, { id, userId }) => {
				const response = await axios.get<ApiResponse<Listing[]>>(
					API_SERVER_CONSTANTS.ENDPOINTS.LISTINGS.LISTING.GET,
					{
						params: { id, userId },
					},
				);
				if (response.data.data) {
					return response.data.data as Listing[];
				}
			},
		},
		hostBookings: {
			type: new GraphQLObjectType({
				name: 'HostBookings',
				fields: {
					listings: { type: new GraphQLList(ListingType) },
					bookings: {
						type: new GraphQLList(
							new GraphQLObjectType({
								name: 'HostBooking',
								fields: {
									booking: { type: BookingType },
									listing: { type: ListingType },
								},
							}),
						),
						args: {
							status: { type: new GraphQLNonNull(BookingStatusEnum) },
						},
						resolve: async (parent, { status }) => {
							const bookingsArray = await Promise.all(
								parent.listings.map(async (listing: Listing) => {
									const response = await axios.get<ApiResponse<Booking[]>>(
										API_SERVER_CONSTANTS.ENDPOINTS.BOOKINGS.BOOKING.GET,
										{
											params: {
												listingId: listing.id,
												status,
											},
										},
									);
									if (!response.data.data) {
										return null;
									}
									return response?.data.data.map((booking) => ({
										booking,
										listing,
									}));
								}),
							);
							return bookingsArray.flat();
						},
					},
				},
			}),
			args: {
				userId: { type: GraphQLString },
			},
			resolve: async (_, { userId }) => {
				const response = await axios.get<ApiResponse<Listing[]>>(
					API_SERVER_CONSTANTS.ENDPOINTS.LISTINGS.LISTING.GET,
					{
						params: { userId },
					},
				);

				return {
					listings: response.data.data,
				};
			},
		},
	},
});
