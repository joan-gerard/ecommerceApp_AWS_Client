import React, { useState } from "react";
import Img from "next/image";
import { useNextSanityImage } from "next-sanity-image";
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiFillStar,
  AiOutlineStar,
} from "react-icons/ai";

import { client } from "../../lib/client";
import { Product } from "@/components";
import { useStateContext } from "../../context/stateContext";

const ProductDetails: React.FC<ProductDetailsProps> = ({
  product,
  similarProducts,
}) => {
  const { image, name, details, price } = product;
  const [index, setIndex] = useState(0);
  const [productQuantity, setProductQuantity] = useState(1)

  const { onAddToCart, cartItems, setShowCart } =
    useStateContext();

  const productImageProps = useNextSanityImage(client, image[index]);
  const updatedproductImageProps = {
    ...productImageProps,
    height: 250,
    width: 250,
  };

  const handleBuyNow = async (product: Product, qty: number) => {
    onAddToCart(product, qty);

    setShowCart(true);
  };

  const increaseQty = () => {
    setProductQuantity((prevQty) => prevQty + 1);
  };
  const decreaseQty = () => {
    setProductQuantity((prevQty) => {
      if (prevQty - 1 < 1) return 1;
      return prevQty - 1;
    });
  };

  return (
    <div>
      <div className="product-detail-container">
        <div>
          <div className="image-container">
            <Img
              {...productImageProps}
              alt={name}
              className="product-detail-image"
            />
          </div>
          <div className="small-images-container">
            {image?.map((item, idx) => (
              <Img
                // eslint-disable-next-line react-hooks/rules-of-hooks
                {...useNextSanityImage(client, item)}
                alt={name}
                key={idx}
                className={
                  idx === index ? "small-image selected-image" : "small-image"
                }
                onMouseEnter={() => setIndex(idx)}
              />
            ))}
          </div>
        </div>
        <div className="product-detail-desc">
          <h1>{name}</h1>
          <div className="reviews">
            <div>
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiOutlineStar />
            </div>
            <p>(20)</p>
          </div>
          <h4>Details</h4>
          <p>{details}</p>
          <p className="price">${price}</p>
          <div className="quantity">
            <h3>Quantity</h3>
            <p className="quantity-desc">
              <span className="minus" onClick={decreaseQty}>
                <AiOutlineMinus />
              </span>
              <span className="num">{productQuantity}</span>
              <span className="plus" onClick={increaseQty}>
                <AiOutlinePlus />
              </span>
            </p>
          </div>
          <div className="buttons">
            <button
              type="button"
              className="add-to-cart"
              onClick={() => onAddToCart(product, productQuantity)}
            >
              Add to Cart
            </button>
            <button
              type="button"
              className="buy-now"
              onClick={() => handleBuyNow(product, productQuantity)}
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
      <div className="maylike-products-wrapper">
        <h2>You may also like</h2>
        <div className="marquee">
          <div className="maylike-products-container track">
            {similarProducts.map((item) => (
              <Product key={item._id} product={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export const getStaticPaths = async () => {
  const pathsQuery = `*[_type == "product"] {
    slug {
      current
    }
  }
  `;

  const productsPaths: ProductsPath[] = await client.fetch(pathsQuery);

  const paths = productsPaths.map((product) => ({
    params: {
      slug: product.slug.current,
    },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps = async ({
  params: { slug },
}: {
  params: { slug: string };
}) => {
  const productQuery = `*[_type == "product" && slug.current == '${slug}'][0]`;
  const similarProductsQuery = '*[_type == "product"]';

  const product: Product = await client.fetch(productQuery);
  const similarProducts: Product[] = await client.fetch(similarProductsQuery);

  return {
    props: { product, similarProducts },
  };
};

export default ProductDetails;
