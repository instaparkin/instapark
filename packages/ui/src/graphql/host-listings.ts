import { gql } from "../__generated__";

export const HOST_LISTINGS = gql(`
query HOST_LISTINGS(
  $userId: String
  $id: String
  $startDate: Int
  $endDate: Int
  $vehicle: Vehicle
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
      rating
      createdAt
      updatedAt
      user {
        userId
        firstName
        lastName
        emails
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
        latitude
        longitude
        name
        landmark
        reviews
        ratings
      }
      reviews {
        id
        listingId
        userId
        rating
        location
        cleanliness
        communication
        value
        accuracy
        description
        createdAt
        updatedAt
      }
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

`)