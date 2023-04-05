import React from "react";
import Link from "next/link";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { Tooltip, Grid } from "@nextui-org/react";

import { useStateContext } from "../context/stateContext";
import Cart from "./Cart";
import SignIn from "./SignIn";
import Account from "./Account";

const Navbar = () => {
  const {
    showCart,
    setShowCart,
    totalQuantities,
    showSignIn,
  } = useStateContext();

  const displayTotalQty =
    totalQuantities === undefined || totalQuantities < 1 ? 0 : totalQuantities;

  const { user, signOut } = useAuthenticator((context) => [context.user]);

  return (
    <div className="navbar-container">
      <p className="logo">
        <Link href="/">Amazing Store</Link>
      </p>
      <div className="navbar-right">
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

        <Grid.Container
          gap={2}
          css={{
            marginLeft: "1px",
            fontSize: "22px",
            cursor: "pointer",
          }}
        >
          <Grid>
            <Tooltip
              hideArrow
              placement="bottomEnd"
              content={<Account />}
              trigger="click"
              css={{
                boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px;",
              }}
            >
              <CgProfile style={{ color: "gray" }} />
            </Tooltip>
          </Grid>
        </Grid.Container>
      </div>
      {showCart && <Cart />}
      {showSignIn && <SignIn />}
    </div>
  );
};

export default Navbar;
