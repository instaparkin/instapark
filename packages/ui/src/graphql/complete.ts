import { gql } from '../__generated__';

export const COMPLETE = gql(`
mutation COMPLETE($bookingId: String, $orderId: String, $userId: String) {
  BookingMutation {
    complete(bookingId: $bookingId, orderId: $orderId, userId: $userId)
  }
}
    `);
