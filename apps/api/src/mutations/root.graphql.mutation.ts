import { GraphQLObjectType } from "graphql";
import { ListingMutation } from "./listing.graphql.mutation";
import { UserMutation } from "./user.graphql.mutation";
import { VendorMutation } from "./vendor.graphql.mutation";

export const RootMutation = new GraphQLObjectType({
  name: "RootMutation",
  fields: {
    ListingMutation: {
      type: ListingMutation,
      resolve: () => ({})
    },
    // UserMutation: {
    //   type: UserMutation,
    //   resolve: () => ({})
    // },
    VendorMutation: {
      type: VendorMutation,
      resolve: () => ({})
    }
  }
});