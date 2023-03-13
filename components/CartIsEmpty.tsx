import React from "react";
import Link from "next/link";
import { AiOutlineShopping } from "react-icons/ai";

import { useStateContext } from "@/context/stateContext";

const CartIsEmpty = () => {
  const { setShowCart } = useStateContext();

  return (
    <div className="empty-cart">
      <AiOutlineShopping size={150} />
      <h3>You shopping cart is empty</h3>
      <Link href="/" passHref>
        <button
          type="button"
          className="btn"
          onClick={() => setShowCart(false)}
        >
          Continue Shopping
        </button>
      </Link>
    </div>
  );
};

export default CartIsEmpty;
