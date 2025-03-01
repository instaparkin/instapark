import { gql } from "../__generated__";

export const GET_TRIPS = gql(`
query GET_TRIPS($userId: String, $status: BookingStatus, $id: String) {
  BookingQuery {
    buyerBookings(userId: $userId, status: $status, id: $id) {
      booking {
        id
        listingId
        userId
        startDate
        endDate
        status
        lockedAt
        basePrice
        parkingPrice
        totalPrice
        ipFee
        penalty
        createdAt
        updatedAt
        payments {
          bookingId
          userId
          orderId
          paymentType
          createdAt
          updatedAt
          order {
            cart_details
            cf_order_id
            created_at
            customer_details {
              customer_id
              customer_name
              customer_email
              customer_phone
              customer_uid
            }
            entity
            order_amount
            order_currency
            order_expiry_time
            order_id
            order_meta {
              return_url
              notify_url
              payment_methods
            }
            order_note
            order_splits {
              vendor_id
              amount
              percentage
              tags
            }
            order_status
            order_tags
            payment_session_id
            terminal_data
          }
        }
        otp {
          bookingId
          otp
          expiresAt
        }
      }
      listing {
        userId
        type
        country
        state
        district
        city
        street
        pincode
        latitude
        longitude
        name
        landmark
        allowedVehicles
        basePrice
        pphbi
        pphcy
        pphcr
        plph
        photos
        id
        isOpen
        createdAt
        updatedAt
        user {
          userId
          firstName
          lastName
          emails
          timeJoined
          phoneNumber
          kyc {
            uidai
            verified
          }
          country
          state
          district
          city
          street
          pincode
          latitude
          longitude
          name
          landmark
        }
      }
    }
  }
}
    `)