import { GraphQLObjectType } from "graphql";
import { BookingQuery } from "./booking.graphql.query";
import { ListingQuery } from "./listing.graphql.query";

export const RootQuery = new GraphQLObjectType({
  name: "RootQuery",
  fields: {
    BookingQuery: {
      type: BookingQuery,
      resolve: () => ({})
    },
    ListingQuery: {
      type: ListingQuery,
      resolve: () => ({})
    }
  }
});