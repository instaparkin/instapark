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