import React, { useEffect } from "react";
import Link from "next/link";
import { AiOutlineShopping } from "react-icons/ai";
import Cart from "./Cart";

import { useStateContext } from "../context/stateContext";
import { useClientSideHydration } from "@/lib/utils";
import CartItem from "./CartItem";

const Navbar = () => {
  const {
    showCart,
    setShowCart,
  } = useStateContext();

  let storedTotals: StoredTotals | undefined;

  const isClientSide = useClientSideHydration();

  if (isClientSide) {
    storedTotals = JSON.parse(window.localStorage.getItem("totals") || "{}");
    console.log("isClientSide", {
      storedTotals: storedTotals?.updatedTotalQty,
    });
  }

  return (
    <div className="navbar-container">
      <p className="logo">
        <Link href="/">Amazing Store</Link>
      </p>

      <button
        type="button"
        className="cart-icon"
        onClick={() => setShowCart(true)}
      >
        <AiOutlineShopping />
        <span className="cart-item-qty">
          {storedTotals?.updatedTotalQty === undefined
            ? 0
            : storedTotals?.updatedTotalQty}
        </span>
      </button>

      {showCart && <Cart />}
    </div>
  );
};

export default Navbar;
