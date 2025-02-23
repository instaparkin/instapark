import { gql } from "../__generated__";

export const SEARCH_LISTINGS = gql(`
query SEARCH_LISTINGS {
  ListingQuery {
    searchListings(vehicleType: Bike) {
      basePrice
      id
      isOpen
      state
      street
      allowedVehicles
      city
      country
      createdAt
      district
      landmark
      userId
      type
      updatedAt
      rating
      pphcy
      latitude
      longitude
      name
      photos
      pincode
      plph
      pphbi
      pphcr
    }
  }
}
`)