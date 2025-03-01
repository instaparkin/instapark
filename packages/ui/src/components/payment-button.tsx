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
    cashfree: unknown;
    orderId: string;
    paymentSessionId: string;
    onPayment: (result: PaymentResult, orderId: string) => void;
}

const doPayment = async ({ cashfree, orderId, paymentSessionId, onPayment }: DoPaymentProps) => {
    if (!cashfree) return;

    const checkoutOptions = {
        paymentSessionId,
        redirectTarget: "_modal",
    };

    cashfree?.checkout(checkoutOptions).then((result: PaymentResult) => {
        if (result.paymentDetails) {
            onPayment(result, orderId);
        }
    });
};

export function PaymentButton({ orderId, paymentSessionId, onPayment, className, amount }: PaymentButtonProps) {
    /**
     * TODO: Try to remove the any type
     */
    const [cashfree, setCashfree] = React.useState<unknown>(null);

    React.useEffect(() => {
        const initializeSDK = async () => {
            const cashfreeInstance = await load({
                mode: getEnv() === "development" ? "sandbox" : "production",
            });
            setCashfree(cashfreeInstance);
        };
        initializeSDK();
    }, []);

    return (
        <Button
            size="responsive"
            className={`w-full sm:w-fit my-4 ${className}`}
            type="button"
            id="renderBtn"
            onClick={() => doPayment({ cashfree, orderId, paymentSessionId, onPayment })}
            disabled={!cashfree}>
            {`Pay  ${amount}`}
        </Button>
    );
}
