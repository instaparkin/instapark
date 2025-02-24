import { gql } from "../__generated__";

export const GET_LISTINGS = gql(`
query GET_LISTING($userId: String, $id: String) {
  ListingQuery {
    getListings(userId: $userId, id: $id) {
      allowedVehicles
      basePrice
      city
      country
      createdAt
      district
      id
      isOpen
      landmark
      userId
      type
      state
      street
      pincode
      latitude
      longitude
      name
      pphbi
      pphcy
      pphcr
      plph
      photos
      rating
      updatedAt
    }
  }
}
`)