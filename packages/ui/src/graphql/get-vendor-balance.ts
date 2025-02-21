import { gql } from "@apollo/client";

export const GET_VENDOR_BALANCE = gql`
query GetVendorBalance($vendorId: String) {
  VendorQuery {
    getVendorBalance(vendorId: $vendorId) {
      vendor_id
      vendor_unsettled
    }
  }
}
`