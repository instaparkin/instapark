import { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLID, GraphQLInt, GraphQLEnumType, GraphQLList } from 'graphql';
import { BookingModel } from '../models/booking.model';

const BookingStatusEnum = new GraphQLEnumType({
  name: 'BookingStatus',
  values: {
    Locked: { value: 'Locked' },
    Booked: { value: 'Booked' },
    Completed: { value: 'Completed' },
    OnGoing: { value: 'OnGoing' },
  },
});

const BookingType = new GraphQLObjectType({
  name: 'Booking',
  fields: () => ({
    id: { type: GraphQLID },
    listingId: { type: GraphQLString },
    userId: { type: GraphQLString },
    startDate: { type: GraphQLInt },
    endDate: { type: GraphQLInt },
    status: { type: BookingStatusEnum },
    lockedAt: { type: GraphQLInt },
    createdAt: { type: GraphQLInt },
    updatedAt: { type: GraphQLInt },
  }),
});

const Query = new GraphQLObjectType({
  name: 'BookingQuery',
  fields: {
    getBookingFromListing: {
      type: BookingType,
      args: { listingId: { type: GraphQLID } },
      resolve: async (_, { listingId }) => await BookingModel.find({ listingId }),
    },
    getAllBookings: {
      type: new GraphQLList(BookingType),
      resolve: async () => await BookingModel.find(),
    },
  },
});

export const schema = new GraphQLSchema({ query: Query });
