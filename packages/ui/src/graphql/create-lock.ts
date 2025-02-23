import { gql } from "../__generated__";

export const CREATE_LOCK = gql(`
mutation Lock(
  $listingId: String!
  $userId: String!
  $startDate: Int!
  $endDate: Int!
  $basePrice: Float!
  $parkingPrice: Float!
  $totalPrice: Float!
  $ipFee: Float!
) {
  BookingMutation {
    lock(
      listingId: $listingId
      userId: $userId
      startDate: $startDate
      endDate: $endDate
      basePrice: $basePrice
      parkingPrice: $parkingPrice
      totalPrice: $totalPrice
      ipFee: $ipFee
    ) {
      bookingId
      orderId
      payment_session_id
      message
    }
  }
}
`)