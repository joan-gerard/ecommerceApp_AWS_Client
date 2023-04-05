import React, { useRef } from "react";
import { Authenticator } from "@aws-amplify/ui-react";

import { useStateContext } from "@/context/stateContext";
import IsSignedIn from "./IsSignedIn";
import { AiOutlineLeft } from "react-icons/ai";

const SignIn = () => {
  const cartRef = useRef();
  const { setShowSignIn } = useStateContext();

  return (
    <div className="signIn-wrapper" ref={cartRef.current}>
      <div className="signIn-container">
        <div className="signIn-heading">
          <button
            type="button"
            className="signIn-heading__back-button"
            onClick={() => setShowSignIn(false)}
          >
            <AiOutlineLeft />
          </button>
        </div>
        <div className="authenticator-container">
          <Authenticator>
            <IsSignedIn />
          </Authenticator>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
