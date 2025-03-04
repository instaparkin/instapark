import { gql } from '../__generated__';

export const CONTACT_US = gql(`
    mutation CONTACT_US(
  $firstName: String!
  $lastName: String!
  $email: String!
  $message: String!
) {
  UserMutation {
    contactUs(
      firstName: $firstName
      lastName: $lastName
      email: $email
      message: $message
    )
  }
}
`);
