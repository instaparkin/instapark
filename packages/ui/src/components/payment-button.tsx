"use client"

import React from "react"
import { load } from "@cashfreepayments/cashfree-js";
import axios from "axios";
import { Button } from "../components/button";
import { useAuth } from "../hooks/use-auth";
import { ApiResponse, BookedResponse } from "@instapark/types";
import { getEnv } from "@instapark/common";

interface PaymentButtonProps {
    orderId: string
    paymentSessionId: string
    buttonText?: string
}

const doPayment = async ({ orderId, paymentSessionId, onPayment }: { orderId: string, paymentSessionId: string, onPayment: (result: { paymentDetails: string }, orderId: string) => void }) => {
    const checkoutOptions = {
        paymentSessionId,
        redirectTarget: "_modal",
    };
    cashfree.checkout(checkoutOptions).then((result: { paymentDetails: string; }) => {
        /**
         * This will be called whenever the payment is completed irrespective of transaction status
         */
        if (result.paymentDetails) {
            onPayment(result, orderId)
        }
    });
};

export function PaymentButton({ orderId, paymentSessionId, buttonText }: PaymentButtonProps) {
    const { userId } = useAuth();
    let cashfree;
    const initializeSDK = async function () {
        cashfree = await load({
            mode: getEnv() === "development" ? "sandbox" : "production",
        });
    };
    initializeSDK();

    return (
        <Button
            size={"lg"}
            className="w-full sm:w-fit my-4"
            type="submit"
            id="renderBtn"
            onClick={() =>
                doPayment({
                    paymentSessionId,
                    onPayment: (result, orderId) => console.log(result, orderId)
                })}>
            {buttonText || "Confirm and Pay"}
        </Button>
    );
}