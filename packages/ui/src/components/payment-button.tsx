"use client";

import React from "react";
import { load } from "@cashfreepayments/cashfree-js";
import { Button } from "../components/button";
import { getEnv } from "@instapark/common";

interface PaymentButtonProps {
    amount: string;
    orderId: string;
    paymentSessionId: string;
    onPayment: (result: PaymentResult, orderId: string) => void;
    className?: string;
}

interface PaymentResult {
    paymentDetails: string;
}

interface DoPaymentProps {
    cashfree: Awaited<ReturnType<typeof load>>;
    orderId: string;
    paymentSessionId: string;
    onPayment: (result: PaymentResult, orderId: string) => void;
}

const doPayment = async ({ cashfree, orderId, paymentSessionId, onPayment }: DoPaymentProps) => {
    if (!cashfree || !cashfree.checkout) return;

    try {
        const result = await cashfree.checkout({ paymentSessionId, redirectTarget: "_modal" });
        if (result.paymentDetails) {
            onPayment(result, orderId);
        }
    } catch (error) {
        console.error("Payment failed:", error);
    }
};

export function PaymentButton({ orderId, paymentSessionId, onPayment, className, amount }: PaymentButtonProps) {
    const [cashfree, setCashfree] = React.useState<Awaited<ReturnType<typeof load>> | null>(null);

    React.useEffect(() => {
        const initializeSDK = async () => {
            try {
                const cashfreeInstance = await load({
                    mode: getEnv() === "development" ? "sandbox" : "production",
                });
                setCashfree(cashfreeInstance);
            } catch (error) {
                console.error("Cashfree SDK failed to load:", error);
            }
        };
        initializeSDK();
    }, []);

    return (
        <Button
            size="responsive"
            className={`w-full sm:w-fit my-4 ${className}`}
            type="button"
            id="renderBtn"
            onClick={() => cashfree && doPayment({ cashfree, orderId, paymentSessionId, onPayment })}
            disabled={!cashfree}>
            {`Pay ${amount}`}
        </Button>
    );
}
