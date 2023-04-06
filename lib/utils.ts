import confetti from "canvas-confetti";
import { useState, useEffect, SetStateAction } from "react";
import { Auth } from "aws-amplify";
import Axios, { AxiosRequestConfig } from "axios";
import toast from "react-hot-toast";

import getStripe from "./getStripe";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export const runFireworks = () => {
  const duration = 5 * 1000;
  const animationEnd = Date.now() + duration;
  const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

  function randomInRange(min: number, max: number) {
    return Math.random() * (max - min) + min;
  }

  const interval: any = setInterval(() => {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    const particleCount = 50 * (timeLeft / duration);
    // since particles fall down, start a bit higher than random
    confetti(
      Object.assign({}, defaults, {
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      })
    );
    confetti(
      Object.assign({}, defaults, {
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      })
    );
  }, 250);
};

export const useClientSideHydration = () => {
  const [isClientSide, setIsClientSide] = useState(false);

  useEffect(() => {
    setIsClientSide(true);
  }, []);

  return isClientSide;
};

export const handleSaveCartItems = (
  cognitoUser: string,
  cartItems: CartItem[],
  cb: (arg0: CartItem[]) => void
) => {
  const user = cognitoUser === "" ? "guest" : cognitoUser;
  window.localStorage.setItem(`${user}.items`, JSON.stringify(cartItems));

  cb(cartItems);
};

export const handleSaveTotals = (
  totalPrice: number,
  totalQty: number,
  cb1: (arg0: number) => void,
  cb2: (arg0: number) => void,
  cognitoUser: string
) => {
  const user = cognitoUser === "" ? "guest" : cognitoUser;

  window.localStorage.setItem(
    `${user}.totals`,
    JSON.stringify({
      updatedTotalPrice: totalPrice,
      updatedTotalQty: totalQty,
    })
  );
  cb1(totalPrice);
  cb2(totalQty);
};

export const handleRemoveStorageItems = (cognitoUser: string) => {
  const user = cognitoUser === "" ? "guest" : cognitoUser;

  window.localStorage.removeItem(`${user}.items`);
  window.localStorage.removeItem(`${user}.totals`);
  window.localStorage.removeItem("checkoutUser");
};

export const handlePlaceOrder = async (cartItems: any) => {
  const user = await Auth.currentSession();
  const headers = {
    Authorization: `Bearer ${user.getIdToken().getJwtToken()}`,
  };

  const formattedData = await cartItems.map((item: any) => {
    return {
      id: item.description,
      count: item.quantity,
    };
  });

  const data = {
    items: formattedData,
  };

  const requestConfig: AxiosRequestConfig = {
    headers,
    method: "POST",
    url: `${baseUrl}/orders`,
    data,
  };

  const axiosRes = await Axios.request(requestConfig);

  return axiosRes;
};

export const handleCheckout = async (
  cartItems: CartItem[],
  cognitoUser: string
) => {
  window.localStorage.setItem("checkoutUser", cognitoUser);
  const stripe = await getStripe();
  const res: Response = await fetch("/api/stripe", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(cartItems),
  });

  if (res.status === 500) return;
  const data = await res.json();

  toast.loading("Redirecting...");
  stripe?.redirectToCheckout({ sessionId: data.id });
};

export const getCognitoUser = (cb1: any, cb2: any) => {
  const startPattern = /^CognitoIdentityServiceProvider/;
  const endPattern = /userData$/;

  for (let i = 0; i < window.localStorage.length; i++) {
    let x = localStorage.key(i);
    if (x && startPattern.test(x) && endPattern.test(x)) {
      const cognitoUserDataArr = x.split(".");
      cb1(cognitoUserDataArr[2]);
      cb2(true);
    }
  }
};
