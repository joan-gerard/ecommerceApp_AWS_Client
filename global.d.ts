interface Image {
  asset: {
    ref: string;
  };
}
interface Product {
  _id: string;
  image: Image[];
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

interface ProductsPath {
  slug: {
    current: string;
  };
}

interface CartItem {
  product: Product;
  quantity: number;
}

type ContextType = {
  showCart: boolean;
  cartItems: CartItem[];
  totalPrice: number;
  totalQuantities: any;
  qty: number;

  increaseQty: () => void;
  decreaseQty: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
  setShowCart: (arg: boolean) => void;
};

type HomeProps = {
  products: Product[];
  bannerData: Banner[];
};
type HeroBannerProps = {
  heroBanner: Banner;
};
type FooterBannerProps = {
  footerBanner: Banner;
};
type ProductProps = {
  product: Product;
};

type ProductDetailsProps = {
  product: Product;
  similarProducts: Product[];
};

type CartItemProps = {
  cartItem: CartItem;
};
