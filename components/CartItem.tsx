import React from "react";
import Img from "next/image";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { TiDeleteOutline } from "react-icons/ti";
import { useNextSanityImage } from "next-sanity-image";
import { client } from "../lib/client";

const CartItem: React.FC<CartItemProps> = ({ cartItem }) => {
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
              <span className="minus" onClick={() => {}}>
                <AiOutlineMinus />
              </span>
              <span className="num">0</span>
              <span className="plus" onClick={() => {}}>
                <AiOutlinePlus />
              </span>
            </p>
          </div>
          <button type="button" className="remove-item" onClick={() => {}}>
            <TiDeleteOutline />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
