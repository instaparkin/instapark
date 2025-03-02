import { gql } from '../__generated__';

export const PRICING_CALCULATOR = gql(`
query PRICING_CALCULATOR(
  $id: String
  $startDate: Int
  $endDate: Int
  $vehicle: Vehicle
) {
  ListingQuery {
    hostListings(id: $id) {
      calulator(startDate: $startDate, endDate: $endDate, vehicle: $vehicle) {
        items {
          field
          value
          separator
        }
        vehicles
        hourly
      }
    }
  }
}
`);
