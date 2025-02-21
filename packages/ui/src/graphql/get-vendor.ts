import { gql } from "@apollo/client";

export const GET_VENDOR = gql`
query GetVendor($vendorId: String) {
  VendorQuery {
    getVendor (vendorId: $vendorId){
      name
      email
      phone
      bank {
        account_number
        account_holder
        ifsc
      }
      kyc_details {
        account_type
        business_type
        pan
      }
      vendor_id
      status
      verify_account
      dashboard_access
      schedule_option {
        settlement_schedule_message
        schedule_id
        merchant_default
      }
      related_docs {
        doc_name
        doc_value
        status
        remarks
      }
    }
  }
}`