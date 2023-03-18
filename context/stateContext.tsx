import CartItem from "@/components/CartItem";
import product from "@/ecomsanity/schemas/product";
import { useClientSideHydration } from "@/lib/utils";
import React, {
  useState,
  useContext,
  createContext,
  ReactElement,
  useEffect,
  useRef,
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

  console.log("STATE CONTEXT");

  // const storedTotals = useRef<StoredTotals>();
  // const storedCartItems = useRef<CartItem[]>();

  // const isClientSide = useClientSideHydration();

  useEffect(() => {
    // storedTotals.current = JSON.parse(
    //   window.localStorage.getItem("totals") || "{}"
    // );

    // storedCartItems.current = JSON.parse(
    //   window.localStorage.getItem("cartItems") || "[]"
    // );
    setCartItems(JSON.parse(window.localStorage.getItem("cartItems") || "[]"));

    const { updatedTotalQty, updatedTotalPrice }: StoredTotals = JSON.parse(
      window.localStorage.getItem("totals") || "{}"
    );

    console.log({ updatedTotalPrice, updatedTotalQty });

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
    // GET existing data
    // const storedTotals = JSON.parse(
    //   window.localStorage.getItem("totals") || "{}"
    // );
    // const storedCartItems: CartItem[] = JSON.parse(
    //   window.localStorage.getItem("cartItems") || "[]"
    // );
    console.log({ totalQuantities, totalPrice, cartItems });

    // check that storedTotals is not an empty object (when adding first product)...
    //...in which case use an intial state of 0
    // const checkedStoredTotals =
    //   Object.keys(storedTotals).length === 0
    //     ? { updatedTotalPrice: 0, updatedTotalQty: 0 }
    //     : storedTotals;

    // add new totals to existing totals
    const updatedTotalQty: number = totalQuantities + quantity;
    const updatedTotalPrice = totalPrice + product.price * quantity;

    window.localStorage.setItem(
      "totals",
      JSON.stringify({ updatedTotalPrice, updatedTotalQty })
    );

    setTotalQuantities(updatedTotalQty);
    setTotalPrice(updatedTotalPrice);

    const checkIfProductInCart = cartItems?.find((item) => {
      return item.product._id === product._id;
    });

    if (checkIfProductInCart) {
      console.log("checkIfProductInCart: true");
      const updatedCartItems = cartItems.map((cartProduct) => {
        if (cartProduct.product._id === product._id) {
          return {
            ...cartProduct,
            quantity: cartProduct.quantity + quantity,
          };
        }
        return cartProduct;
      });

      window.localStorage.setItem(
        "cartItems",
        JSON.stringify(updatedCartItems)
      );

      setCartItems(updatedCartItems);
    } else {
      console.log("checkIfProductInCart: false");
      console.log("cartItems before", { cartItems, product, qty });

      // merge new product with existing daat
      window.localStorage.setItem(
        "cartItems",
        JSON.stringify([...cartItems, { product, quantity }])
      );
      // console.log("cartItems after", { cartItems, product, qty });

      setCartItems([...cartItems, { product, quantity }]);
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

        window.localStorage.setItem(
          "cartItems",
          JSON.stringify(updatedCartItems)
        );

        setCartItems(updatedCartItems);

        const newTotalQty = updatedCartItems.reduce((a, b) => {
          return a + b.quantity;
        }, 0);

        const newTotalPrice = updatedCartItems.reduce((a, b) => {
          return a + b.product.price * b.quantity;
        }, 0);

        window.localStorage.setItem(
          "totals",
          JSON.stringify({
            updatedTotalPrice: newTotalPrice,
            updatedTotalQty: newTotalQty,
          })
        );

        setTotalPrice(newTotalPrice);
        setTotalQuantities(newTotalQty);
      } else if (value === "dec") {
        if (foundProduct.quantity > 1) {
          const updatedCartItems = cartItems.map((item) => {
            if (item.product._id === id) {
              return { ...item, quantity: item.quantity - 1 };
            }
            return item;
          });
          window.localStorage.setItem(
            "cartItems",
            JSON.stringify(updatedCartItems)
          );

          setCartItems(updatedCartItems);

          const newTotalQty = updatedCartItems.reduce((a, b) => {
            return a + b.quantity;
          }, 0);

          const newTotalPrice = updatedCartItems.reduce((a, b) => {
            return a + b.product.price * b.quantity;
          }, 0);

          window.localStorage.setItem(
            "totals",
            JSON.stringify({
              updatedTotalPrice: newTotalPrice,
              updatedTotalQty: newTotalQty,
            })
          );

          setTotalPrice(newTotalPrice);
          setTotalQuantities(newTotalQty);
        }
      }
    }
  };

  const onRemove = (cartItem: CartItem) => {
    const updatedCartItems = cartItems.filter(
      (item) => item.product._id != cartItem.product._id
    );
    console.log({ updatedCartItems });

    window.localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
    setCartItems(updatedCartItems);

    const newTotalQty = updatedCartItems.reduce((a, b) => {
      return a + b.quantity;
    }, 0);

    const newTotalPrice = updatedCartItems.reduce((a, b) => {
      return a + b.product.price * b.quantity;
    }, 0);

    window.localStorage.setItem(
      "totals",
      JSON.stringify({
        updatedTotalPrice: newTotalPrice,
        updatedTotalQty: newTotalQty,
      })
    );

    setTotalQuantities(newTotalQty);
    setTotalPrice(newTotalPrice);
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
