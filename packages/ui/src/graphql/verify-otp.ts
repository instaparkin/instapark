import { gql } from '../__generated__';

export const VERIFY_OTP = gql(`
mutation VERIFY_OTP($bookingId: String!, $otp: Int!) {
  BookingMutation {
    verifyOTP(bookingId: $bookingId, otp: $otp)
  }
}`);
