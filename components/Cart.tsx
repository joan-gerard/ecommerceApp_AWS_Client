import React, { useRef } from "react";
import { AiOutlineLeft } from "react-icons/ai";

import { useStateContext } from "@/context/stateContext";
import CartIsEmpty from "./CartIsEmpty";
import CartItem from "./CartItem";
import { handleCheckout } from "@/lib/utils";

const Cart = () => {
  // const productImageProps = useNextSanityImage(client, image[index]);
  // const updatedproductImageProps = {
  //   ...productImageProps,
  //   height: 250,
  //   width: 250,
  // };

  const cartRef = useRef();
  const {
    totalPrice,
    totalQuantities,
    cartItems,
    setShowCart,
    isAuthenticated,
    setShowSignIn,
  } = useStateContext();

  return (
    <div className="cart-wrapper" ref={cartRef.current}>
      <div className="cart-container">
        <div className="cart-heading">
          <button
            type="button"
            className="cart-heading__back-button"
            onClick={() => setShowCart(false)}
          >
            <AiOutlineLeft />
          </button>
          <span className="heading">Your Cart</span>
          <span className="cart-num-items">{totalQuantities} item(s)</span>
        </div>

        {cartItems?.length === 0 && <CartIsEmpty />}

        <div className="product-container">
          {cartItems?.length != 0 &&
            cartItems?.map((cartItem, idx) => (
              <CartItem cartItem={cartItem} key={cartItem.product._id} />
            ))}
        </div>

        {cartItems?.length != 0 && (
          <div className="cart-bottom">
            <div className="total">
              <h3>Subtotal</h3>
              <h3>${totalPrice}</h3>
            </div>
            <div className="btn-container">
              {isAuthenticated ? (
                <button
                  type="button"
                  className="btn"
                  onClick={() => handleCheckout(cartItems)}
                >
                  Pay with Stripe
                </button>
              ) : (
                <button
                  type="button"
                  className="btn"
                  onClick={() => setShowSignIn(true)}
                >
                  Sign In
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
