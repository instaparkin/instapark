import { gql } from '../__generated__';

export const HOST_LISTINGS = gql(`
query HOST_LISTINGS(
  $userId: String
  $id: String
) {
  ListingQuery {
    hostListings(userId: $userId, id: $id) {
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
      user {
        userId
        firstName
        lastName
        email
        timeJoined
        phoneNumber
        kyc {
          uidai
          verified
        }
        country
        state
        district
        city
        street
        pincode
        name
        landmark
      }
    }
  }
}
`);
