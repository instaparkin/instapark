import { gql } from '../__generated__';

export const CREATE_VENDOR = gql(`
mutation CreateVendor(
  $name: String
  $email: String
  $phone: String
  $bank: VendorBankInput
  $kyc_details: VendorKYCInput
  $vendor_id: String
) {
  VendorMutation {
    createVendor(
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
