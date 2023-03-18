import React, { useEffect } from "react";
import Link from "next/link";
import { AiOutlineShopping } from "react-icons/ai";
import Cart from "./Cart";

import { useStateContext } from "../context/stateContext";

const Navbar = () => {
  const { showCart, setShowCart, totalQuantities } = useStateContext();

  const dispalyTotalQty =
    totalQuantities === undefined || totalQuantities < 1 ? 0 : totalQuantities;
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
        {dispalyTotalQty != 0 && (
          <span className="cart-item-qty">{dispalyTotalQty}</span>
        )}
      </button>

      {showCart && <Cart />}
    </div>
  );
};

export default Navbar;
