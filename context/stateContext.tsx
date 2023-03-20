import { handleSaveCartItems, handleSaveTotals } from "@/lib/utils";
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
  qty: 1,

  increaseQty: () => null,
  decreaseQty: () => null,
  onAddToCart: (product: Product, quantity: number) => null,
  toggleCartItemQuantity: (id: string, value: string) => null,
  onRemove: (cartItem: CartItem) => null,
  setCartItems: (args: CartItem[]) => null,
  setTotalPrice: (arg: number) => null,
  setTotalQuantities: (arg: number) => null,
});

export const StateContext = ({ children }: { children: ReactElement }) => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantities, setTotalQuantities] = useState(0);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    setCartItems(JSON.parse(window.localStorage.getItem("cartItems") || "[]"));

    const { updatedTotalQty, updatedTotalPrice }: StoredTotals = JSON.parse(
      window.localStorage.getItem("totals") || "{}"
    );

    setTotalQuantities(
      updatedTotalQty === undefined || updatedTotalQty < 1 ? 0 : updatedTotalQty
    );
    setTotalPrice(
      updatedTotalPrice === undefined || updatedTotalPrice < 1
        ? 0
        : updatedTotalPrice
    );
  }, []);

  const increaseQty = () => {
    setQty((prevQty) => prevQty + 1);
  };
  const decreaseQty = () => {
    setQty((prevQty) => {
      if (prevQty - 1 < 1) return 1;
      return prevQty - 1;
    });
  };

  const onAddToCart = async (product: Product, quantity: number) => {
    const updatedTotalQty: number = totalQuantities + quantity;
    const updatedTotalPrice = totalPrice + product.price * quantity;

    handleSaveTotals(
      updatedTotalPrice,
      updatedTotalQty,
      setTotalPrice,
      setTotalQuantities
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

      handleSaveCartItems(updatedCartItems, setCartItems);
    } else {
      handleSaveCartItems([...cartItems, { product, quantity }], setCartItems);
    }
    toast.success(`${qty} ${product.name} added to the cart.`);
  };

  const toggleCartItemQuantity = (id: string, value: string) => {
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

        handleSaveCartItems(updatedCartItems, setCartItems);

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
          setTotalQuantities
        );
      } else if (value === "dec") {
        if (foundProduct.quantity > 1) {
          const updatedCartItems = cartItems.map((item) => {
            if (item.product._id === id) {
              return { ...item, quantity: item.quantity - 1 };
            }
            return item;
          });

          handleSaveCartItems(updatedCartItems, setCartItems);

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
            setTotalQuantities
          );
        }
      }
    }
  };

  const onRemove = (cartItem: CartItem) => {
    const updatedCartItems = cartItems.filter(
      (item) => item.product._id != cartItem.product._id
    );

    handleSaveCartItems(updatedCartItems, setCartItems);

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
      setTotalQuantities
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
        qty,
        increaseQty,
        decreaseQty,
        onAddToCart,
        toggleCartItemQuantity,
        onRemove,
        setCartItems,
        setTotalPrice,
        setTotalQuantities,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);
