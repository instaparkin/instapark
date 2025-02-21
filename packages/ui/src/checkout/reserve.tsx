"use client"

import React from "react"
import { load } from "@cashfreepayments/cashfree-js";
import axios from "axios";
import { Button } from "../components/button";
import { useAuth } from "../hooks/use-auth";
import { CheckoutConfirm } from "./checkout-confirm";
import { ApiResponse, BookedResponse } from "@instapark/types";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Badge } from "../components/badge";
import { PaymentGateway } from "./payment-gateway";

interface ReserveProps {
  bookingId: string
  orderId: string
  paymentSessionId: string
}

export function Reserve({ bookingId, orderId, paymentSessionId }: ReserveProps) {
  const { userId } = useAuth();

  console.log(orderId, paymentSessionId);

  let cashfree;
  const initializeSDK = async function () {
    cashfree = await load({
      mode: "sandbox",
    });
  };
  initializeSDK();

  const doPayment = async () => {

    const checkoutOptions = {
      paymentSessionId,
      redirectTarget: "_modal",
    };

    cashfree.checkout(checkoutOptions).then((result) => {
      if (result.error) {
        // This will be true whenever user clicks on close icon inside the modal or any error happens during the payment
        console.log("User has closed the popup or there is some payment error, Check for Payment Status");
        console.log(result.error);
      }
      if (result.redirect) {

        // This will be true when the payment redirection page couldnt be opened in the same window
        // This is an exceptional case only when the page is opened inside an inAppBrowser
        // In this case the customer will be redirected to return url once payment is completed
        console.log("Payment will be redirected");
      }
      if (result.paymentDetails) {
        axios.post<ApiResponse<BookedResponse>>("http://localhost:8085/bookings/book", {
          orderId,
          bookingId,
          userId
        }).then(res => {
          console.log(res.data.data?.otp);
        })
        // This will be called whenever the payment is completed irrespective of transaction status
        console.log("Payment has been completed, Check for Payment Status");
        console.log(result);
      }
    });
  };

  return (
    <div>
      <CheckoutConfirm />
      {
        <Button size={"lg"} className="w-full sm:w-fit my-4" type="submit" id="renderBtn" onClick={doPayment}>
          {"Confirm and Pay"}
        </Button>
      }
    </div>
  );
}