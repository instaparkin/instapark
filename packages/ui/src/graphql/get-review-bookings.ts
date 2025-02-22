import { gql } from "@apollo/client";

export const GET_REVIEW_BOOKINGS = gql`
query GetBookingsForHost {
  BookingQuery {
    getBookingsForHost(status: Booked) {
      id
      listingId
      userId
      startDate
      endDate
      status
      lockedAt
      createdAt
      updatedAt
      totalPrice
      basePrice
      parkingPrice
      listing {
        photos,
        country,
        state,
        city,
        street,
        pincode
      }
    }
  }
}
`
