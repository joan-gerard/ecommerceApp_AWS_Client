import React, { useRef } from "react";
import { AiOutlineLeft } from "react-icons/ai";
import toast, { Toast } from "react-hot-toast";

import { useStateContext } from "@/context/stateContext";
import CartIsEmpty from "./CartIsEmpty";
import CartItem from "./CartItem";
import getStripe from "@/lib/getStripe";

const Cart = () => {
  // const productImageProps = useNextSanityImage(client, image[index]);
  // const updatedproductImageProps = {
  //   ...productImageProps,
  //   height: 250,
  //   width: 250,
  // };

  const cartRef = useRef();
  const { totalPrice, totalQuantities, cartItems, setShowCart } =
    useStateContext();


  const handleCheckout = async () => {
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

  return (
    <div className="cart-wrapper" ref={cartRef.current}>
      <div className="cart-container">
        <button
          type="button"
          className="cart-heading"
          onClick={() => setShowCart(false)}
        >
          <AiOutlineLeft />
          <span className="heading">You Cart</span>
          <span className="cart-num-items">{totalQuantities} item(s)</span>
        </button>

        {cartItems.length < 1 && <CartIsEmpty />}

        <div className="product-container">
          {cartItems.length >= 1 &&
            cartItems.map((cartItem, idx) => (
              <CartItem cartItem={cartItem} key={cartItem.product._id} />
            ))}
        </div>

        {cartItems.length >= 1 && (
          <div className="cart-bottom">
            <div className="total">
              <h3>Subtotal</h3>
              <h3>${totalPrice}</h3>
            </div>
            <div className="btn-container">
              <button
                type="button"
                className="btn"
                onClick={() => handleCheckout()}
              >
                Pay with Stripe
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
