import React from "react";
import Img from "next/image";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { TiDeleteOutline } from "react-icons/ti";
import { useNextSanityImage } from "next-sanity-image";
import { client } from "../lib/client";
import { useStateContext } from "@/context/stateContext";

const CartItem: React.FC<CartItemProps> = ({ cartItem }) => {
  const { toggleCartItemQuantity, onRemove } = useStateContext();

  console.log({cartItem})

  return (
    <div className="product">
      <Img
        {...useNextSanityImage(client, cartItem.product.image[0])}
        alt=""
        className="cart-product-image"
      />
      <div className="item-desc">
        <div className="flex top">
          <h5>{cartItem.product.name}</h5>
          <h4>${cartItem.product.price}</h4>
        </div>
        <div className="flex bottom">
          <div>
            <p className="quantity-desc">
              <span
                className="minus"
                onClick={() =>
                  toggleCartItemQuantity(cartItem.product._id, "dec")
                }
              >
                <AiOutlineMinus />
              </span>
              <span className="num">{cartItem.quantity}</span>
              <span
                className="plus"
                onClick={() =>
                  toggleCartItemQuantity(cartItem.product._id, "inc")
                }
              >
                <AiOutlinePlus />
              </span>
            </p>
          </div>
          <button
            type="button"
            className="remove-item"
            onClick={() => onRemove(cartItem)}
          >
            <TiDeleteOutline />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
