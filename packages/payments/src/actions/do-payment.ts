import { load } from "@cashfreepayments/cashfree-js";

interface DoPaymentProps {
    paymentSessionId: string;
}

let cashfree: Awaited<ReturnType<typeof load>> | null = null;

export const doPayment = async ({ paymentSessionId }: DoPaymentProps): Promise<void> => {
    try {
        if (!cashfree) {
            cashfree = await load({
                mode: "sandbox",
            });
        }
        if (!cashfree) {
            throw new Error("Failed to load Cashfree SDK");
        }

        const checkoutOptions = {
            paymentSessionId: paymentSessionId,
            redirectTarget: "_self",
        };

        cashfree.checkout(checkoutOptions);
        console.log("Payment initiated successfully");
    } catch (error) {
        console.error("Failed to initiate payment:", error);
    }
};
