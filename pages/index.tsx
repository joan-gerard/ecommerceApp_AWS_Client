import React from "react";
import { client } from "@/lib/client";

import { Product, HeroBanner, FooterBanner } from "@/components";

const Home: React.FC<HomeProps> = ({ products, bannerData }) => {
  const formatData = () => {
    const records: any[] = [];

    products.map((item) => {
      console.log({ item });

      const newItem = {
        id: item._id,
        title: item.name,
        brand: null,
        description: item.details,
        pk: item.group,
        sk: `${item.category}#${item._id}`,
      };
      records.push(newItem);
    });

    return records;
  };

  const res = formatData();

  console.log({ res });

  return (
    <>
      {!!bannerData.length && <HeroBanner heroBanner={bannerData[0]} />}
      <div className="products-heading">
        <h2>Best Selling Products</h2>
        <p>Speakers of many variations</p>
      </div>
      <div className="products-container">
        {products?.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>
      {!!bannerData.length && <FooterBanner footerBanner={bannerData[0]} />}
    </>
  );
};

export const getServerSideProps = async () => {
  const productsQuery = '*[_type == "product"]';
  const products: Product[] = await client.fetch(productsQuery);

  const bannerQuery = '*[_type == "banner"]';
  const bannerData: Banner[] = await client.fetch(bannerQuery);

  return {
    props: { products, bannerData },
  };
};

export default Home;
