import { gql } from '../__generated__';

export const GET_PROFILE = gql(`
query GET_PROFILE($userId: String!) {
  UserQuery {
    getProfile(userId: $userId) {
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
`);
