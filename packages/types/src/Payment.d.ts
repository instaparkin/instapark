import { AccountType, BusinessType, PaymentType, VendorStatus } from "./enums"

export interface Payment {
    bookingId: string
    userId: string
    orderId: string
    paymentType: PaymentType
    createdAt: number
    updatedAt: number
}

export type PaymentRequest = Pick<Payment,
    "bookingId" | "userId" | "orderId">;

export type Vendor = {
    /**Fields required During form submission */
    name: string,
    email: string,
    phone: number,
    bank: {
        account_number: number,
        account_holder: string,
        ifsc: string
    }
    kyc_details: {
        account_type: AccountType,
        business_type: BusinessType,
        pan: string
    }

    /**Fields Not required During form submission */
    vendor_id: string,
    status: VendorStatus,
    verify_account: boolean,
    dashboard_access: boolean,
    schedule_option: number,
}


export type VendorRequest = Omit<Vendor,
    "vendor_id" | "status" | "verify_account" | "dashboard_access" | "schedule_option" | "kyc_details"> & {
    kyc_details: Omit<Vendor["kyc_details"], "account_type" | "business_type">;
};
