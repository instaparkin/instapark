import { gql } from "../__generated__";

export const UPDATE_LISTING = gql(`
mutation UPDATE_LISTING(
  $photos: [String]
  $plph: Float
  $pphcr: Float
  $pphcy: Float
  $pphbi: Float
  $updateListingId: String
  $userId: String
  $type: PlaceType
  $country: String
  $state: String
  $district: String
  $city: String
  $street: String
  $pincode: Int
  $latitude: Float
  $longitude: Float
  $name: String
  $landmark: String
  $allowedVehicles: [Vehicle]
  $basePrice: Float
) {
  ListingMutation {
    updateListing(
      photos: $photos
      plph: $plph
      pphcr: $pphcr
      pphcy: $pphcy
      pphbi: $pphbi
      id: $updateListingId
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
      name: $name
      landmark: $landmark
      allowedVehicles: $allowedVehicles
      basePrice: $basePrice
    )
  }
}
`)