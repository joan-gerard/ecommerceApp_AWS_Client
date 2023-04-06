interface Image {
  asset: {
    _ref: string;
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
  group: string;
  category: string;
  subcategory: string;
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

interface StoredTotals {
  updatedTotalPrice: number;
  updatedTotalQty: number;
}

type ContextType = {
  showCart: boolean;
  cartItems: CartItem[];
  totalPrice: number;
  totalQuantities: number;
  onAddToCart: (product: Product, quantity: number, user: string) => void;
  setShowCart: (arg: boolean) => void;
  toggleCartItemQuantity: (id: string, value: string, user: string) => void;
  onRemove: (cartItem: CartItem, user: string) => void;
  setCartItems: (args: CartItem[]) => void;
  setTotalPrice: (arg: number) => void;
  setTotalQuantities: (arg: number) => void;
  isAuthenticated: boolean;
  setIsAuthenticated: (arg: boolean) => void;
  cognitoUser: string;
  setCognitoUser: (args: string) => void;
  showSignIn: boolean;
  setShowSignIn: (arg: boolean) => void;
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
