interface Product {
  _id: string;
  image: string;
  name: string;
  slug: {
    current: string;
  };
  details: string;
  price: number;
}

interface Banner {
  image: string;
  buttonText: string;
  product: string;
  desc: string;
  smallText: number;
  midText: number;
  largeText1: number;
  largeText2: number;
  discount: number;
  saleTime: number;
}

type HomeProps = {
  products: Product[];
  bannerData: Banner[];
};
type ProductProps = {
  product: Product;
};
