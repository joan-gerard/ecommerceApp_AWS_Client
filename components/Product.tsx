import React from "react";
import Link from "next/link";
import Img from "next/image";
import { useNextSanityImage } from "next-sanity-image";

import { client } from "@/lib/client";
import product from "@/ecomsanity/schemas/product";

const Product: React.FC<ProductProps> = ({
  product: { image, name, slug, price },
}) => {
  const productImageProps = useNextSanityImage(client, image[0]);
  const updatedproductImageProps = {
    ...productImageProps,
    height: 250,
    width: 250,
  };

  return (
    <div>
      <Link href={`/product/${slug.current}`}>
        <div className="product-card">
          <Img
            {...updatedproductImageProps}
            alt={name}
            className="product-image"
          />
          <p className="product-name">{name}</p>
          <p className="product-price">${price}</p>
        </div>
      </Link>
    </div>
  );
};

export default Product;
