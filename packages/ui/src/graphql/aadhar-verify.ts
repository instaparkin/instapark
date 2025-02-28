import { gql } from "../__generated__";

export const AADHAR_VERIFY = gql(`
    mutation AADHAR_VERIFY($otp: String!, $refId: String!, $userId: String!) {
  UserMutation {
    aadharVerify(otp: $otp, ref_id: $refId, userId: $userId) {
      ref_id
      status
      message
      care_of
      address
      dob
      email
      gender
      name
      split_address {
        country
        dist
        house
        landmark
        pincode
        po
        state
        street
        subdist
        vtc
        locality
      }
      year_of_birth
      mobile_hash
      photo_link
      share_code
      xml_file
    }
  }
}

    `)