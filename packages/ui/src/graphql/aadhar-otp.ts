import { gql } from '../__generated__';

export const AADHAR_OTP = gql(`
mutation AADHAR_OTP($uidai: String!) {
  UserMutation {
    aadharOTP(uidai: $uidai) {
      status
      message
      ref_id
    }
  }
}
    `);
