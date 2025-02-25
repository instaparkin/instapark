import { gql } from "../__generated__";

export const GET_PROFILE = gql(`
query GET_PROFILE($userId: String!) {
  UserQuery {
    getProfile(userId: $userId) {
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
  }
}
`)