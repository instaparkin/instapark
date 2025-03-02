import {
	GraphQLBoolean,
	GraphQLInputObjectType,
	GraphQLInt,
	GraphQLNonNull,
	GraphQLObjectType,
	GraphQLString,
} from 'graphql';
import { axios } from '@instapark/utils';
import {
	AadhaarVerifyResponse,
	AadharOTPResponse,
	ApiResponse,
} from '@instapark/types';
import { API_SERVER_CONSTANTS } from '../constants/api-server-constants';
import { AadhaarResponseType } from '../types/user.graphql.type';

export const KYCInputType = new GraphQLInputObjectType({
	name: 'KYCInput',
	fields: {
		uidai: { type: GraphQLString },
		verified: { type: GraphQLBoolean },
	},
});

export const UserMutation = new GraphQLObjectType({
	name: 'UserMutation',
	fields: {
		upsertProfile: {
			type: GraphQLString,
			args: {
				userId: { type: new GraphQLNonNull(GraphQLString) },
				firstName: { type: GraphQLString },
				lastName: { type: GraphQLString },
				email: { type: GraphQLString },
				timeJoined: { type: GraphQLInt },
				phoneNumber: { type: GraphQLString },
				kyc: { type: KYCInputType },
				country: { type: GraphQLString },
				state: { type: GraphQLString },
				district: { type: GraphQLString },
				city: { type: GraphQLString },
				street: { type: GraphQLString },
				pincode: { type: GraphQLInt },
				name: { type: GraphQLString },
				landmark: { type: GraphQLString },
			},
			resolve: async (parent, args) => {
				const response = (
					await axios.post<ApiResponse<null>>(
						API_SERVER_CONSTANTS.ENDPOINTS.USER.PROFILE.UPSERT,
						args,
					)
				).data.message;
				return response;
			},
		},
		aadharOTP: {
			type: new GraphQLObjectType({
				name: 'AadharOTPResponse',
				fields: {
					status: { type: GraphQLString },
					message: { type: GraphQLString },
					ref_id: { type: GraphQLInt },
				},
			}),
			args: {
				uidai: { type: new GraphQLNonNull(GraphQLString) },
			},
			resolve: async (_, args) => {
				const response = await axios.post<ApiResponse<AadharOTPResponse>>(
					API_SERVER_CONSTANTS.ENDPOINTS.USER.AADHAR.OTP,
					args,
				);

				return response.data.data;
			},
		},
		aadharVerify: {
			type: AadhaarResponseType,
			args: {
				otp: { type: new GraphQLNonNull(GraphQLString) },
				ref_id: { type: new GraphQLNonNull(GraphQLString) },
				userId: { type: new GraphQLNonNull(GraphQLString) },
			},
			resolve: async (_, args) => {
				const response = await axios.post<ApiResponse<AadhaarVerifyResponse>>(
					API_SERVER_CONSTANTS.ENDPOINTS.USER.AADHAR.VERIFY,
					args,
				);

				return response.data.data;
			},
		},
	},
});
