import { gql } from "../__generated__";

export const UPSERT_PROFILE = gql(`
    mutation UpsertProfile(
  $userId: String!
  $landmark: String
  $name: String
  $pincode: Int
  $street: String
  $city: String
  $district: String
  $state: String
  $country: String
  $kyc: KYCInput
  $firstName: String
  $lastName: String
  $email: String
  $timeJoined: Int
  $phoneNumber: String
) {
  UserMutation {
    upsertProfile(
      userId: $userId
      landmark: $landmark
      name: $name
      pincode: $pincode
      street: $street
      city: $city
      district: $district
      state: $state
      country: $country
      kyc: $kyc
      firstName: $firstName
      lastName: $lastName
      email: $email
      timeJoined: $timeJoined
      phoneNumber: $phoneNumber
    )
  }
}
`)