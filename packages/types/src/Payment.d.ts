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
    vendor_id: string,
    name: string,
    email: string,
    phone: string,
    bank: {
        account_number: string,
        account_holder: string,
        ifsc: string
    }
    kyc_details: {
        account_type: string,
        business_type: string,
        pan: string
    }
    /**Fields Not required During form submission */
    schedule_option: {
        settlement_schedule_message: string,
        schedule_id: number,
        merchant_default: boolean
    }
    related_docs: {
        doc_name: string,
        doc_value: string,
        status: string,
        remarks: string
    }[]
    status: string,
    verify_account: boolean,
    dashboard_access: boolean,
}

export type VendorRequest = Omit<Vendor,
    "status" | "verify_account" | "dashboard_access" | "schedule_option" | "kyc_details" | "related_docs"> & {
        kyc_details: Omit<Vendor["kyc_details"], "account_type" | "business_type">;
    };

export type OrderSplit = {
    vendor_id: string;
    amount: number | null;
    percentage: number;
    tags: string | null;
};

export type CustomerDetails = {
    customer_id: string;
    customer_name: string | null;
    customer_email: string;
    customer_phone: string;
    customer_uid: string | null;
};

export type OrderMeta = {
    return_url: string;
    notify_url: string | null;
    payment_methods: string | null;
};

export type Order = {
    cart_details: string | null;
    cf_order_id: string;
    created_at: string;
    customer_details: CustomerDetails;
    entity: string;
    order_amount: number;
    order_currency: string;
    order_expiry_time: string;
    order_id: string;
    order_meta: OrderMeta;
    order_note: string | null;
    order_splits: OrderSplit[];
    order_status: string;
    order_tags: string | null;
    payment_session_id: string;
    terminal_data: string | null;
};


export interface PaymentExtended extends Payment {
    order: Order
}

export type VendorBalance = {
    vendor_id: string
    vendor_unsettled: number
}

interface OrderSplit {
    merchant_vendor_id: string;
    percentage: number;
    tags: string | null;
}

export interface Transaction {
    amount: number;
    settlement_eligibility_time: string;
    merchant_order_id: string;
    tx_time: string;
    settled: string;
    entity_id: string;
    merchant_settlement_utr: string;
    currency: string;
    sale_type: string;
    customer_email: string;
    customer_phone: string;
    payment_utr: string;
    merchant_vendor_commission: string;
    split_service_charge: string;
    split_service_tax: string;
    pg_service_tax: string;
    pg_service_charge: string;
    pg_charge_postpaid: string;
    merchant_settlement_id: string;
    added_on: string;
    tags: string;
    entity_type: string;
    settlement_initiated_on: string;
    settlement_time: string;
    eligible_split_balance: string;
    order_splits: OrderSplit[];
}

export interface VendorCommission {
    amount: number;
    merchant_order_id: string;
    tx_time: string;
    settled: string;
    entity_id: string;
    merchant_vendor_id: string;
    currency: string;
    sale_type: string;
    customer_email: string;
    customer_phone: string;
    added_on: string;
    entity_type: string;
    vendor_settlement_time: string;
    vendor_settlement_initiated_on: string;
    vendor_settlement_eligibility_time: string;
    vendor_settlement_id: string;
    vendor_commission: string;
    vendor_pg_service_charge: string;
    vendor_pg_service_tax: string;
    status: string;
}
