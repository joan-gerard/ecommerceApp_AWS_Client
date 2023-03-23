import confetti from "canvas-confetti";
import { useState, useEffect } from "react";
import { Auth } from "aws-amplify";
import Axios, { Method, AxiosRequestConfig } from "axios";
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
  cartItems: CartItem[],
  cb: (arg0: CartItem[]) => void
) => {
  window.localStorage.setItem("cartItems", JSON.stringify(cartItems));

  cb(cartItems);
};

export const handleSaveTotals = (
  totalPrice: number,
  totalQty: number,
  cb1: (arg0: number) => void,
  cb2: (arg0: number) => void
) => {
  window.localStorage.setItem(
    "totals",
    JSON.stringify({
      updatedTotalPrice: totalPrice,
      updatedTotalQty: totalQty,
    })
  );
  cb1(totalPrice);
  cb2(totalQty);
};

export const handleRemoveStorageItems = () => {
  window.localStorage.removeItem("cartItems");
  window.localStorage.removeItem("totals");
};

export const handlePlaceOrder = async (cartItems: any) => {
  const user = await Auth.currentSession();
  console.log({ user });
  const headers = {
    Authorization: `Bearer ${user.getIdToken().getJwtToken()}`,
  };
  console.log({ headers });

  const formattedData = await cartItems.map((item: any) => {
    return {
      id: item.description,
      count: item.quantity,
    };
  });
  console.log({ formattedData });

  const data = {
    items: formattedData,
  };

  console.log({ data });

  const requestConfig: AxiosRequestConfig = {
    headers,
    method: "POST",
    url: `${baseUrl}/orders`,
    data,
  };

  console.log({ requestConfig });

  const axiosRes = await Axios.request(requestConfig);

  console.log({ axiosRes });

  return axiosRes;
};
