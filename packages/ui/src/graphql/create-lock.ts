import { gql } from '../__generated__';

export const CREATE_LOCK = gql(`
mutation LOCK(
  $listingId: String!
  $userId: String!
  $startDate: Int!
  $endDate: Int!
  $basePrice: Float!
  $parkingPrice: Float!
  $totalPrice: Float!
  $vehicle: Vehicle!
  $ipFee: Float!
  $customer: LockCustomer!
  $vendorId: String!
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
      vehicle: $vehicle
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
`);
