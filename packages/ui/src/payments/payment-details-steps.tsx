import { Path, UseFormReturn } from "react-hook-form";
import { VendorCreateFormType } from "../forms/vendor-create-form";

export type Field<T extends Record<string, unknown>> = {
    name: Path<T>;
    disabled?: boolean,
    description: string
}

export type Group<T extends Record<string, unknown>> = {
    title: string;
    href: string;
    component?: ({ form }: { form: UseFormReturn<T> }) => JSX.Element;
    fields: Field<T>[]
    status: "VERIFIED" | "ACTION_REQUIRED" | "BANK_VALIDATION_FAILED"
}

export const paymentDetailsSteps: Group<VendorCreateFormType>[] = [
    {
        title: "Personal",
        href: "#personal",
        status: "VERIFIED",
        fields: [
            {
                name: "name",
                description: "Please enter your full legal name as per your official documents. This will be used for identification and verification purposes."
            },
            {
                name: "phone",
                description: "Provide your active mobile number. Ensure that the number is valid and reachable, as it may be used for verification or future communication."
            },
            {
                name: "email",
                description: "Enter your primary email address. This email will be used for important updates, notifications, and future correspondence regarding your account."
            }
        ]
    },
    {
        title: "Bank",
        href: "#bank",
        status: "VERIFIED",
        fields: [
            {
                name: "bank.account_holder",
                description: "Enter the full name of the account holder exactly as it appears in the bank records. Discrepancies may lead to transaction failures."
            },
            {
                name: "bank.account_number",
                description: "Provide your complete bank account number. Double-check the number to avoid any errors, as incorrect details may result in failed transactions."
            },
            {
                name: "bank.ifsc",
                description: "Enter the IFSC (Indian Financial System Code) of your bank branch. This is an 11-character alphanumeric code used to identify your specific bank branch for electronic transactions."
            }
        ]
    },
    {
        title: "KYC",
        href: "#kyc",
        status: "VERIFIED",
        fields: [
            {
                name: "kyc_details.pan",
                description: "Provide your Permanent Account Number (PAN) issued by the Government of India. This is a mandatory requirement for financial transactions and identity verification."
            }
        ]
    }
];
