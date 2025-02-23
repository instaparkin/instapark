import { gql } from "../__generated__";

export const GET_TRIPS = gql(`
    query GET_TRIPS($userId: String) {
      BookingQuery {
        getBookingsForBuyer(userId: $userId) {
          id
          listingId
          userId
          startDate
          endDate
          status
          listing {
            userId
            type
            country
            state
            district
            city
            street
            pincode
            name
            landmark
            photos
          }
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
        }
      }
    }
    `)