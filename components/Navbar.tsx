import React, { useEffect } from "react";
import Link from "next/link";
import { AiOutlineShopping } from "react-icons/ai";
import Cart from "./Cart";

import { useStateContext } from "../context/stateContext";
import { useClientSideHydration } from "@/lib/utils";
import CartItem from "./CartItem";

const Navbar = () => {
  const { showCart, setShowCart, totalQuantities, setCartItems, cartItems } = useStateContext();

  let storedTotals;
  let storedCartItems: CartItem[];

  const isClientSide = useClientSideHydration();

  if (isClientSide) {
    storedTotals = JSON.parse(window.localStorage.getItem("totals") || "{}");
    storedCartItems = JSON.parse(
      window.localStorage.getItem("cartItems") || "[]"
    );
  }

  const handleShowCart = () => {
    setCartItems(storedCartItems)
    setShowCart(true)
  };

  // useEffect(() => {
  // }, [])

  console.log('NAVBAR', cartItems)
  

  return (
    <div className="navbar-container">
      <p className="logo">
        <Link href="/">Amazing Store</Link>
      </p>

      <button
        type="button"
        className="cart-icon"
        onClick={() => handleShowCart()}
      >
        <AiOutlineShopping />
        <span className="cart-item-qty">
          {storedTotals?.updatedTotalQty > 0
            ? storedTotals?.updatedTotalQty
            : 0}
        </span>
      </button>

      {showCart && <Cart />}
    </div>
  );
};

export default Navbar;
