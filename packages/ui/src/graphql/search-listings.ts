import { gql } from '../__generated__';

export const SEARCH_LISTINGS = gql(`
query SearchListings(
  $street: String
  $vehicleType: Vehicle
  $startDate: Int
  $endDate: Int
) {
  ListingQuery {
    searchListings(
      street: $street
      vehicleType: $vehicleType
      startDate: $startDate
      endDate: $endDate
    ) {
      userId
      type
      country
      state
      district
      city
      street
      pincode
      latitude
      longitude
      name
      landmark
      allowedVehicles
      basePrice
      pphbi
      pphcy
      pphcr
      plph
      photos
      id
      isOpen
      createdAt
      updatedAt
    }
  }
}

`);
