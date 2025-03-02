import { gql } from '../__generated__';

export const GET_RECON_DATA = gql(`
query GET_RECON_DATA(
  $userId: String
  $limit: Int!
  $entityType: EntityType!
) {
  BookingQuery {
    buyerBookings(userId: $userId) {
      booking {
        payments {
          reconData(limit: $limit, entity_type: $entityType) {
            amount
            merchant_order_id
            tx_time
            settled
            entity_id
            currency
            sale_type
            customer_email
            customer_phone
            added_on
            entity_type
            settlement_eligibility_time
            merchant_settlement_utr
            payment_utr
            merchant_vendor_commission
            split_service_charge
            split_service_tax
            pg_service_tax
            pg_service_charge
            pg_charge_postpaid
            merchant_settlement_id
            tags
            settlement_initiated_on
            settlement_time
            eligible_split_balance
            order_splits {
              split {
                merchant_vendor_id
                percentage
                tags
              }
            }
            merchant_vendor_id
            vendor_settlement_time
            vendor_settlement_initiated_on
            vendor_settlement_eligibility_time
            vendor_settlement_id
            vendor_commission
            vendor_pg_service_charge
            vendor_pg_service_tax
            status
          }
        }
      }
    }
  }
}
`);
