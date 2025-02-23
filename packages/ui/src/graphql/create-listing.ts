import { gql } from "../__generated__";

export const CREATE_LISTING = gql(`
mutation CreateListing(
  $userId: String!
  $type: PlaceType!
  $country: String!
  $state: String!
  $district: String!
  $city: String!
  $street: String!
  $pincode: Int!
  $latitude: Float!
  $longitude: Float!
  $allowedVehicles: [Vehicle!]!
  $basePrice: Float!
  $pphbi: Float!
  $pphcy: Float!
  $pphcr: Float!
  $plph: Float!
  $photos: [String!]!
  $name: String
  $landmark: String
) {
  ListingMutation {
    createListing(
      userId: $userId
      type: $type
      country: $country
      state: $state
      district: $district
      city: $city
      street: $street
      pincode: $pincode
      latitude: $latitude
      longitude: $longitude
      allowedVehicles: $allowedVehicles
      basePrice: $basePrice
      pphbi: $pphbi
      pphcy: $pphcy
      pphcr: $pphcr
      plph: $plph
      photos: $photos
      name: $name
      landmark: $landmark
    )
  }
}
`)