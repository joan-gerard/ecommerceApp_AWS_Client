import React, { useState, useEffect } from "react";
import Link from "next/link";
import { BsBagCheckFill } from "react-icons/bs";
import Axios, { Method, AxiosRequestConfig } from "axios";

import { useStateContext } from "@/context/stateContext";
import {
  handlePlaceOrder,
  handleRemoveStorageItems,
  runFireworks,
  getCognitoUser,
} from "@/lib/utils";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

const Success = () => {
  const {
    setCartItems,
    setTotalPrice,
    setTotalQuantities,
    cognitoUser,
    setCognitoUser,
    setIsAuthenticated,
  } = useStateContext();
  const [orderNumber, setOrderNumber] = useState("");

  useEffect(() => {
    const queryString = window.location.search;

    const urlParams = new URLSearchParams(queryString);

    const sessionID = urlParams.get("session_id");

    const headers = {
      Authorization: `Bearer ${process.env.stripeKey}`,
    };
    const requestConfig: AxiosRequestConfig = {
      headers,
      method: "GET",
      url: `https://api.stripe.com/v1/checkout/sessions/${sessionID}/line_items?limit=5`,
    };

    const getData = async (paymentSessionId: string | null) => {
      const axiosRes = await Axios.request(requestConfig).then(
        (res) => res.data.data
      );

      // check if order exists
      const isOrderPresent = await Axios.get(
        `https://kiwpny70ba.execute-api.eu-central-1.amazonaws.com/dev/order/${paymentSessionId}`
      )
        .then((res) => res)
        .catch((err) => console.log({ err }));

      if (isOrderPresent === undefined) {
        const placedOrderSuccess = await handlePlaceOrder(
          axiosRes,
          paymentSessionId
        ).then((res) => res.data.message);

        setOrderNumber(placedOrderSuccess);
      } else {
        return;
      }
    };

    getData(sessionID);

    const checkoutUser = window.localStorage.getItem("checkoutUser");

    if (!checkoutUser) {
      return;
    }

    // Reset data
    handleRemoveStorageItems(checkoutUser);
    setCartItems([]);
    setTotalPrice(0);
    setTotalQuantities(0);
    runFireworks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="success-wrapper">
      <div className="success">
        <p className="icon">
          <BsBagCheckFill />
        </p>
        <h2>Thank you for your order</h2>
        {orderNumber != "" ? (
          <p className="email-msg">Your order number: {orderNumber}</p>
        ) : null}
        <p className="email-msg">Check your email inbox for a confirmation</p>
        <p className="description">
          If you have any question, please email
          <a className="email" href="mailto:order@example.com">
            order@example.com
          </a>
        </p>
        <Link href="/" passHref>
          <button type="button" className="btn">
            Continue Shopping
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Success;
