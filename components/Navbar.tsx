import React, { useEffect } from "react";
import Link from "next/link";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { HiOutlineLogout } from "react-icons/hi";
import { AuthEventData } from "@aws-amplify/ui";

import Cart from "./Cart";
import { useStateContext } from "../context/stateContext";

const Navbar = ({
  signOut,
}: {
  signOut: ((data?: AuthEventData | undefined) => void) | undefined;
}) => {
  const { showCart, setShowCart, totalQuantities } = useStateContext();

  const displayTotalQty =
    totalQuantities === undefined || totalQuantities < 1 ? 0 : totalQuantities;
  return (
    <div className="navbar-container">
      <p className="logo">
        <Link href="/">Amazing Store</Link>
      </p>
      <div>
        <button
          type="button"
          className="cart-icon"
          onClick={() => setShowCart(true)}
        >
          <AiOutlineShoppingCart />
          {displayTotalQty != 0 && (
            <span className="cart-item-qty">{displayTotalQty}</span>
          )}
        </button>
        <button type="button" className="cart-icon" onClick={signOut}>
          <HiOutlineLogout />
        </button>
      </div>
      {showCart && <Cart />}
    </div>
  );
};

export default Navbar;
