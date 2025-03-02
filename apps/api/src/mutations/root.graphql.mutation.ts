import { GraphQLObjectType } from 'graphql';
import { ListingMutation } from './listing.graphql.mutation';
import { VendorMutation } from './vendor.graphql.mutation';
import { UserMutation } from './user.graphql.mutation';
import { BookingMutation } from './booking.mutation';

export const RootMutation = new GraphQLObjectType({
	name: 'RootMutation',
	fields: {
		ListingMutation: {
			type: ListingMutation,
			resolve: () => ({}),
		},
		UserMutation: {
			type: UserMutation,
			resolve: () => ({}),
		},
		VendorMutation: {
			type: VendorMutation,
			resolve: () => ({}),
		},
		BookingMutation: {
			type: BookingMutation,
			resolve: () => ({}),
		},
	},
});
