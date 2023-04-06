import { useStateContext } from "@/context/stateContext";
import { handleCheckout } from "@/lib/utils";
import React, { useEffect } from "react";

const IsSignedIn = () => {
  const { setShowSignIn, cartItems } = useStateContext();

  useEffect(() => {
    setShowSignIn(false);
    // handleCheckout(cartItems)
  }, [setShowSignIn]);

  return (
    <div className="signin-success">
      <h3>You are signed in</h3>
    </div>
  );
};

export default IsSignedIn;
