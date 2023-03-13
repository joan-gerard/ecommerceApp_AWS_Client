import { client, urlFor } from "@/lib/client";
import Link from "next/link";
import React from "react";
import { useNextSanityImage } from "next-sanity-image";
import Img from "next/image";

const HeroBanner: React.FC<HeroBannerProps> = ({ heroBanner }) => {
  const bannerImageProps = useNextSanityImage(client, heroBanner.image);

  return (
    <div className="hero-banner-container">
      <div>
        <p className="beats-solo">{heroBanner.smallText}</p>
        <h3>{heroBanner.midText}</h3>
        <Img
          {...bannerImageProps}
          alt="headphones"
          className="hero-banner-image"
        />

        <div>
          <Link href={`/product/${heroBanner.product}`} passHref>
            <button type="button">{heroBanner.buttonText}</button>
          </Link>
          <div className="desc">
            <h5>Description</h5>
            <p>{heroBanner.desc}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
