import { gql } from "../__generated__";

export const UPSERT_PROFILE = gql(`
    mutation UpsertProfile(
  $userId: String!
  $landmark: String
  $name: String
  $longitude: Float
  $latitude: Float
  $pincode: Int
  $street: String
  $city: String
  $district: String
  $state: String
  $country: String
  $kyc: KYCInput
  $firstName: String
  $lastName: String
  $emails: [String]
  $timeJoined: Int
  $phoneNumber: String
) {
  UserMutation {
    upsertProfile(
      userId: $userId
      landmark: $landmark
      name: $name
      longitude: $longitude
      latitude: $latitude
      pincode: $pincode
      street: $street
      city: $city
      district: $district
      state: $state
      country: $country
      kyc: $kyc
      firstName: $firstName
      lastName: $lastName
      emails: $emails
      timeJoined: $timeJoined
      phoneNumber: $phoneNumber
    )
  }
}
`)