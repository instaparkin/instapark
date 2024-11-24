"use server"

import { Cashfree, CreateOrderRequest } from "cashfree-pg";
import { config } from "dotenv";

config();

Cashfree.XClientId = process.env.CASHFREE_CLIENT_ID;
Cashfree.XClientSecret = process.env.CASHFREE_CLIENT_SECRET;

export async function createOrder({
  order_amount,
  customer_details,
}: Omit<CreateOrderRequest, "order_currency">) {
  const request: CreateOrderRequest = {
    order_amount,
    order_currency: "INR",
    customer_details: {
      customer_id: customer_details.customer_id,
      customer_name: customer_details.customer_name,
      customer_email: customer_details.customer_email,
      customer_phone: customer_details.customer_phone,
    },
  };

  Cashfree.PGCreateOrder("2023-08-01", request)
    .then((response) => {
      const orderResponse = response.data;
      console.log("Order response:", orderResponse);
      return orderResponse;
    })
    .catch((error) => {
      console.error("Error setting up order request:", error.response?.data || error.message);
    });
}
