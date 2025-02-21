import { gql } from "@apollo/client";

export const CREATE_LISTING = gql`
mutation CreateListing(
  $userId: String
  $type: PlaceType
  $country: String
  $photos: [String]
  $plph: Float
  $pphcr: Float
  $pphcy: Float
  $pphbi: Float
  $basePrice: Float
  $allowedVehicles: [Vehicle]
  $landmark: String
  $name: String
  $longitude: Float
  $latitude: Float
  $pincode: Int
  $street: String
  $city: String
  $district: String
  $state: String
) {
  ListingMutation {
    createListing(
      userId: $userId
      type: $type
      country: $country
      photos: $photos
      plph: $plph
      pphcr: $pphcr
      pphcy: $pphcy
      pphbi: $pphbi
      basePrice: $basePrice
      allowedVehicles: $allowedVehicles
      landmark: $landmark
      name: $name
      longitude: $longitude
      latitude: $latitude
      pincode: $pincode
      street: $street
      city: $city
      district: $district
      state: $state
    )
  }
}

`