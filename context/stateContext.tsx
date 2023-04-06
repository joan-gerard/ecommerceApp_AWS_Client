import {
  handleSaveCartItems,
  handleSaveTotals,
  getCognitoUser,
} from "@/lib/utils";
import React, {
  useState,
  useContext,
  createContext,
  ReactElement,
  useEffect,
} from "react";
import { toast } from "react-hot-toast";

export const Context = createContext<ContextType>({
  showCart: false,
  setShowCart: (arg: boolean) => {},
  cartItems: [],
  totalPrice: 0,
  totalQuantities: 0,
  onAddToCart: (product: Product, quantity: number, user: string) => null,
  toggleCartItemQuantity: (id: string, value: string, user: string) => null,
  onRemove: (cartItem: CartItem, user: string) => null,
  setCartItems: (args: CartItem[]) => null,
  setTotalPrice: (arg: number) => null,
  setTotalQuantities: (arg: number) => null,

  isAuthenticated: false,
  setIsAuthenticated: (arg: boolean) => {},
  cognitoUser: "",
  setCognitoUser: (args: string) => null,
  showSignIn: false,
  setShowSignIn: (arg: boolean) => {},
});

export const StateContext = ({ children }: { children: ReactElement }) => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantities, setTotalQuantities] = useState(0);

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [cognitoUser, setCognitoUser] = useState("");
  const [showSignIn, setShowSignIn] = useState(false);

  useEffect(() => {
    const user = cognitoUser === "" ? "guest" : cognitoUser;
    setCartItems(
      JSON.parse(window.localStorage.getItem(`${user}.items`) || "[]")
    );

    const { updatedTotalQty, updatedTotalPrice }: StoredTotals = JSON.parse(
      window.localStorage.getItem(`${user}.totals`) || "{}"
    );

    setTotalQuantities(
      updatedTotalQty === undefined || updatedTotalQty < 1 ? 0 : updatedTotalQty
    );
    setTotalPrice(
      updatedTotalPrice === undefined || updatedTotalPrice < 1
        ? 0
        : updatedTotalPrice
    );
  }, [cognitoUser]);

  useEffect(() => {
    getCognitoUser(setCognitoUser, setIsAuthenticated);
  }, [showSignIn, showCart]);

  const onAddToCart = async (
    product: Product,
    quantity: number,
    user: string
  ) => {
    const updatedTotalQty: number = totalQuantities + quantity;
    const updatedTotalPrice = totalPrice + product.price * quantity;

    handleSaveTotals(
      updatedTotalPrice,
      updatedTotalQty,
      setTotalPrice,
      setTotalQuantities,
      user
    );

    const checkIfProductInCart = cartItems?.find((item) => {
      return item.product._id === product._id;
    });

    if (checkIfProductInCart) {
      const updatedCartItems = cartItems.map((cartProduct) => {
        if (cartProduct.product._id === product._id) {
          return {
            ...cartProduct,
            quantity: cartProduct.quantity + quantity,
          };
        }
        return cartProduct;
      });

      handleSaveCartItems(user, updatedCartItems, setCartItems);
    } else {
      handleSaveCartItems(
        user,
        [...cartItems, { product, quantity }],
        setCartItems
      );
    }
    toast.success(`${quantity} ${product.name} added to the cart.`);
  };

  const toggleCartItemQuantity = (id: string, value: string, user: string) => {
    const foundProduct = cartItems.find((item) => item.product._id === id);
    const index = cartItems.findIndex((item) => item.product._id === id);

    if (foundProduct !== undefined) {
      if (value === "inc") {
        const updatedCartItems = cartItems.map((item) => {
          if (item.product._id === id) {
            return { ...item, quantity: item.quantity + 1 };
          }
          return item;
        });

        handleSaveCartItems(user, updatedCartItems, setCartItems);

        const newTotalPrice = updatedCartItems.reduce((a, b) => {
          return a + b.product.price * b.quantity;
        }, 0);
        const newTotalQty = updatedCartItems.reduce((a, b) => {
          return a + b.quantity;
        }, 0);

        handleSaveTotals(
          newTotalPrice,
          newTotalQty,
          setTotalPrice,
          setTotalQuantities,
          user
        );
      } else if (value === "dec") {
        if (foundProduct.quantity > 1) {
          const updatedCartItems = cartItems.map((item) => {
            if (item.product._id === id) {
              return { ...item, quantity: item.quantity - 1 };
            }
            return item;
          });

          handleSaveCartItems(user, updatedCartItems, setCartItems);

          const newTotalPrice = updatedCartItems.reduce((a, b) => {
            return a + b.product.price * b.quantity;
          }, 0);
          const newTotalQty = updatedCartItems.reduce((a, b) => {
            return a + b.quantity;
          }, 0);

          handleSaveTotals(
            newTotalPrice,
            newTotalQty,
            setTotalPrice,
            setTotalQuantities,
            user
          );
        }
      }
    }
  };

  const onRemove = (cartItem: CartItem, user: string) => {
    const updatedCartItems = cartItems.filter(
      (item) => item.product._id != cartItem.product._id
    );

    handleSaveCartItems(user, updatedCartItems, setCartItems);

    const newTotalQty = updatedCartItems.reduce((a, b) => {
      return a + b.quantity;
    }, 0);

    const newTotalPrice = updatedCartItems.reduce((a, b) => {
      return a + b.product.price * b.quantity;
    }, 0);

    handleSaveTotals(
      newTotalPrice,
      newTotalQty,
      setTotalPrice,
      setTotalQuantities,
      user
    );
  };

  return (
    <Context.Provider
      value={{
        showCart,
        setShowCart,
        cartItems,
        totalPrice,
        totalQuantities,
        onAddToCart,
        toggleCartItemQuantity,
        onRemove,
        setCartItems,
        setTotalPrice,
        setTotalQuantities,
        isAuthenticated,
        setIsAuthenticated,
        cognitoUser,
        setCognitoUser,
        showSignIn,
        setShowSignIn,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);
