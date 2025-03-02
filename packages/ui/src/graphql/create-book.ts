import { gql } from '../__generated__';

export const CREATE_BOOK = gql(`
  mutation CREATE_BOOK($bookingId: String, $orderId: String, $userId: String) {
  BookingMutation {
    book(bookingId: $bookingId, orderId: $orderId, userId: $userId)
  }
}

  `);
