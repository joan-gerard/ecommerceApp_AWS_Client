import React, { useState, useEffect } from "react";
import Link from "next/link";
import { BsBagCheckFill } from "react-icons/bs";
import { Auth } from "aws-amplify";
import Axios, { Method, AxiosRequestConfig } from "axios";

import { useStateContext } from "@/context/stateContext";
import {
  handlePlaceOrder,
  handleRemoveStorageItems,
  runFireworks,
} from "@/lib/utils";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

const Success = () => {
  const { setCartItems, setTotalPrice, setTotalQuantities, cartItems } =
    useStateContext();

  const [ordedPlaced, setOrdedPlaced] = useState([]);

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

    const getData = async () => {
      const axiosRes = await Axios.request(requestConfig).then(
        (res) => res.data.data
      );

      handlePlaceOrder(axiosRes);
    };

    getData();

    // Reset data
    handleRemoveStorageItems();
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
