import React from "react";
import Link from "next/link";
import Img from "next/image";
import { useNextSanityImage } from "next-sanity-image";

import { client } from "@/lib/client";

const FooterBanner: React.FC<FooterBannerProps> = ({
  footerBanner: {
    discount,
    largeText1,
    largeText2,
    saleTime,
    midText,
    product,
    buttonText,
    smallText,
    desc,
    image,
  },
}) => {
  const footerImageProps = useNextSanityImage(client, image);

  return (
    <div className="footer-banner-container">
      <div className="banner-desc">
        <div className="left">
          <p>{discount}</p>
          <h3>{largeText1}</h3>
          <h3>{largeText2}</h3>
          <p>{saleTime}</p>
        </div>
        <div className="right">
          <p>{smallText}</p>
          <h3>{midText}</h3>
          <p>{desc}</p>
          <Link href={`/product/${product}`} passHref>
            <button type="button">{buttonText}</button>
          </Link>
        </div>
        <Img
          {...footerImageProps}
          alt={product}
          className="footer-banner-image"
        />
      </div>
    </div>
  );
};

export default FooterBanner;
