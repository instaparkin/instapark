import { gql } from "@apollo/client";

export const GET_TRANSACTIONS = gql`
query GetTransactions($orderIds: [String], $limit: Int, $entityType: String) {
  VendorQuery {
    getTransactions(orderIds: $orderIds, limit: $limit, entity_type: $entityType) {
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
        vendor_id
        amount
        percentage
        tags
      }
    }
  }
}
`