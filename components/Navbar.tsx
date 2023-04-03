import React from "react";
import Link from "next/link";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { HiOutlineLogout, HiOutlineLogin } from "react-icons/hi";
import { useAuthenticator } from "@aws-amplify/ui-react";

import { useStateContext } from "../context/stateContext";
import Cart from "./Cart";
import SignIn from "./SignIn";

const Navbar = () => {
  const {
    showCart,
    setShowCart,
    totalQuantities,
    showSignIn,
    setIsAuthenticated,
    setShowSignIn,
  } = useStateContext();

  const displayTotalQty =
    totalQuantities === undefined || totalQuantities < 1 ? 0 : totalQuantities;

  const { user, signOut } = useAuthenticator((context) => [context.user]);

  const handleSignOut = () => {
    signOut();
    setIsAuthenticated(false);
  };
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
        {user ? (
          <button
            type="button"
            className="cart-icon"
            onClick={() => handleSignOut()}
          >
            {/* <button type="button" className="cart-icon"> */}
            <HiOutlineLogout />
          </button>
        ) : (
          <button
            type="button"
            className="cart-icon"
            onClick={() => setShowSignIn(true)}
          >
            {/* <button type="button" className="cart-icon"> */}
            <HiOutlineLogin />
          </button>
        )}
      </div>
      {showCart && <Cart />}
      {showSignIn && <SignIn />}
    </div>
  );
};

export default Navbar;
