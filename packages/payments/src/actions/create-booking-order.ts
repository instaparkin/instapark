import { CreateOrderRequest } from "cashfree-pg";
import { createOrder } from "./create-order";
import { doPayment } from "./do-payment";

export async function createBookingOrder({ customer_details }: Omit<CreateOrderRequest, "order_currency, order_amount">) {
    const response = await createOrder({
        order_amount: 10.00,
        customer_details: {
            customer_id: customer_details.customer_id,
            customer_name: customer_details.customer_name,
            customer_email: customer_details.customer_email,
            customer_phone: customer_details.customer_phone
        }
    })
    return response;
}

export async function doPayementForBooking({ paymentSessionId }: { paymentSessionId: string }) {
}