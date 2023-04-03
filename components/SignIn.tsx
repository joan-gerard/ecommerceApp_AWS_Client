import React, { useRef } from "react";
import { Authenticator } from "@aws-amplify/ui-react";

import { useStateContext } from "@/context/stateContext";
import IsSignedIn from "./IsSignedIn";

const SignIn = () => {
  const cartRef = useRef();

  return (
    <div className="cart-wrapper" ref={cartRef.current}>
      <div className="cart-container">
        <Authenticator>
          <IsSignedIn />
        </Authenticator>
      </div>
    </div>
  );
};

export default SignIn;
