import React from "react";
import Link from "next/link";
import { AiOutlineShopping } from "react-icons/ai";
import Cart from "./Cart";

import { useStateContext } from "../context/stateContext";
import { useClientSideHydration } from "@/lib/utils";

const Navbar = () => {
  const { showCart, setShowCart, totalQuantities } = useStateContext();

  let parsedStorageTotals;

  const isClientSide = useClientSideHydration();

  if (isClientSide) {
    parsedStorageTotals = JSON.parse(
      window.localStorage.getItem("totals") || "{}"
    );
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
          {parsedStorageTotals?.updatedTotalQty > 0
            ? parsedStorageTotals?.updatedTotalQty
            : 0}
        </span>
      </button>

      {showCart && <Cart />}
    </div>
  );
};

export default Navbar;
