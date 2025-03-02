import { gql } from '../__generated__';

export const UPDATE_VENDOR = gql(`
mutation UPDATE_VENDOR(
  $name: String
  $email: String
  $phone: String
  $bank: VendorBankInput
  $kyc_details: VendorKYCInput
  $vendor_id: String
) {
  VendorMutation {
    updateVendor(
      name: $name
      email: $email
      phone: $phone
      bank: $bank
      kyc_details: $kyc_details
      vendor_id: $vendor_id
    )
  }
}
`);
