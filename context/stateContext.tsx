import CartItem from "@/components/CartItem";
import product from "@/ecomsanity/schemas/product";
import React, { useState, useEffect, useContext, createContext } from "react";
import { toast } from "react-hot-toast";

export const Context = createContext<ContextType>({
  showCart: false,
  setShowCart: (arg: boolean) => {},
  cartItems: [],
  totalPrice: 0,
  totalQuantities: {},
  qty: 1,

  increaseQty: () => null,
  decreaseQty: () => null,
  onAddToCart: (product: Product, quantity: number) => null,
  toggleCartItemQuantity: (id: string, value: string) => null,
});

export const StateContext = ({ children }: { children: any }) => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantities, setTotalQuantities] = useState(0);
  const [qty, setQty] = useState(1);

  const increaseQty = () => {
    setQty((prevQty) => prevQty + 1);
  };
  const decreaseQty = () => {
    setQty((prevQty) => {
      if (prevQty - 1 < 1) return 1;
      return prevQty - 1;
    });
  };

  const onAddToCart = (product: Product, quantity: number) => {
    const checkIfProductInCart = cartItems?.find((item) => {
      return item.product._id === product._id;
    });

    setTotalPrice(
      (prevTotalPrice) => prevTotalPrice + product.price * quantity
    );
    setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);

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
      setCartItems(updatedCartItems);
    } else {
      setCartItems([...cartItems, { product, quantity }]);
    }
    toast.success(`${qty} ${product.name} added to the cart.`);
  };

  const toggleCartItemQuantity = (id: string, value: string) => {
    const foundProduct = cartItems.find((item) => item.product._id === id);
    const index = cartItems.findIndex((item) => item.product._id === id);

    let removeFoundProduct = cartItems.filter(
      (item) => item.product._id !== id
    );


    if (foundProduct !== undefined) {
      if (value === "inc") {
        let newCartItems = [
          ...removeFoundProduct,
          { ...foundProduct, quantity: foundProduct.quantity + 1 },
        ];

        setCartItems(newCartItems);

        setTotalPrice(
          (prevTotalPrice) => prevTotalPrice + foundProduct.product.price
        );

        setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + 1);
      } else if (value === "dec") {
        if (foundProduct.quantity > 1) {
          setCartItems([
            ...removeFoundProduct,
            { ...foundProduct, quantity: foundProduct.quantity - 1 },
          ]);

          setTotalPrice(
            (prevTotalPrice) => prevTotalPrice - foundProduct.product.price
          );

          setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - 1);
        }
      }
    }
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
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);
