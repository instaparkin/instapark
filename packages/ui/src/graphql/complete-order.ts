import { gql } from "../__generated__";

export const COMPLETE_ORDER = gql(`
mutation COMPLETE_ORDER(
  $bookingId: String!
  $listingId: String!
  $userId: String!
  $basePrice: Float!
  $parkingPrice: Float!
  $totalPrice: Float!
  $ipFee: Float!
  $customer: CompleteOrderCustomer!
  $vendorId: String!
) {
  BookingMutation {
    completeOrder(
      id: $bookingId
      listingId: $listingId
      userId: $userId
      basePrice: $basePrice
      parkingPrice: $parkingPrice
      totalPrice: $totalPrice
      ipFee: $ipFee
      customer: $customer
      vendor_id: $vendorId
    ) {
      bookingId
      orderId
      payment_session_id
      message
    }
  }
}

`)