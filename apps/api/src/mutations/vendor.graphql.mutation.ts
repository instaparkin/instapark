import { ApiResponse } from '@instapark/types';
import { axios } from '@instapark/utils';
import {
	GraphQLInputObjectType,
	GraphQLObjectType,
	GraphQLString,
} from 'graphql';
import { API_SERVER_CONSTANTS } from '../constants/api-server-constants';

export const VendorBankInput = new GraphQLInputObjectType({
	name: 'VendorBankInput',
	fields: {
		account_number: { type: GraphQLString },
		account_holder: { type: GraphQLString },
		ifsc: { type: GraphQLString },
	},
});

export const VendorKYCInput = new GraphQLInputObjectType({
	name: 'VendorKYCInput',
	fields: {
		pan: { type: GraphQLString },
	},
});

export const VendorMutation = new GraphQLObjectType({
	name: 'VendorMutation',
	fields: {
		createVendor: {
			type: GraphQLString,
			args: {
				name: { type: GraphQLString },
				email: { type: GraphQLString },
				phone: { type: GraphQLString },
				bank: { type: VendorBankInput },
				kyc_details: { type: VendorKYCInput },
				vendor_id: { type: GraphQLString },
			},
			resolve: async (_, args) => {
				try {
					const response = await axios.post<ApiResponse<null>>(
						API_SERVER_CONSTANTS.ENDPOINTS.BOOKINGS.VENDOR.CREATE,
						args,
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
		updateVendor: {
			type: GraphQLString,
			args: {
				name: { type: GraphQLString },
				email: { type: GraphQLString },
				phone: { type: GraphQLString },
				bank: { type: VendorBankInput },
				kyc_details: { type: VendorKYCInput },
				vendor_id: { type: GraphQLString },
			},
			resolve: async (_, args) => {
				try {
					const response = await axios.patch<ApiResponse<null>>(
						API_SERVER_CONSTANTS.ENDPOINTS.BOOKINGS.VENDOR.UPDATE,
						args,
						{
							params: {},
						},
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
