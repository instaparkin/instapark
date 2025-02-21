import { GraphQLObjectType } from "graphql";
import { BookingQuery } from "./booking.graphql.query";
import { ListingQuery } from "./listing.graphql.query";
import { VendorQuery } from "./vendor.graphql.query";
import { UserQuery } from "./user.graphql.query";
import { OrderQuery } from "./order.graphql.query";

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
    },
    VendorQuery: {
      type: VendorQuery,
      resolve: () => ({})
    },
    UserQuery: {
      type: UserQuery,
      resolve: () => ({})
    },
    OrderQuery: {
      type: OrderQuery,
      resolve: () => ({})
    }
  }
});