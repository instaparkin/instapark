import {
	GraphQLFloat,
	GraphQLInt,
	GraphQLList,
	GraphQLNonNull,
	GraphQLObjectType,
	GraphQLString,
} from 'graphql';
import { PlaceTypeEnum, VehicleEnum } from '../types/listing.graphql.type';
import { ApiResponse, Listing, ListingRequest } from '@instapark/types';
import { axios } from '@instapark/utils';
import { API_SERVER_CONSTANTS } from '../constants/api-server-constants';

export const ListingMutation = new GraphQLObjectType({
	name: 'ListingMutation',
	fields: {
		createListing: {
			type: GraphQLString,
			args: {
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
				name: { type: GraphQLString },
				landmark: { type: GraphQLString },
				allowedVehicles: {
					type: new GraphQLNonNull(
						new GraphQLList(new GraphQLNonNull(VehicleEnum)),
					),
				},
				basePrice: { type: new GraphQLNonNull(GraphQLFloat) },
				pphbi: { type: GraphQLFloat },
				pphcy: { type: GraphQLFloat },
				pphcr: { type: GraphQLFloat },
				plph: { type: new GraphQLNonNull(GraphQLFloat) },
				photos: {
					type: new GraphQLNonNull(
						new GraphQLList(new GraphQLNonNull(GraphQLString)),
					),
				},
			},
			resolve: async (_, args: ListingRequest) => {
				try {
					const response = await axios.post<ApiResponse<Listing>>(
						API_SERVER_CONSTANTS.ENDPOINTS.LISTINGS.LISTING.CREATE,
						args,
					);

					return response.data.message;
				} catch (error) {
					if (axios.isAxiosError(error) && error.response) {
						return error.response.data.message;
					}
					return 'An unexpected error occurred';
				}
			},
		},
		updateListing: {
			type: GraphQLString,
			args: {
				id: { type: new GraphQLNonNull(GraphQLString) },
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

			resolve: async (_, args) => {
				try {
					const response = await axios.put<ApiResponse<Listing>>(
						API_SERVER_CONSTANTS.ENDPOINTS.LISTINGS.LISTING.UPDATE,
						{ id: args.id, ...args },
					);
					return response.data.message;
				} catch (error) {
					if (axios.isAxiosError(error) && error.response) {
						return error.response.data.message;
					}
					return 'An Unknown error occured';
				}
			},
		},
	},
});
