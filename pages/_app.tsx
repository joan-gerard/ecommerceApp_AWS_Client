import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";
import { Amplify } from "aws-amplify";
import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";

import "@/styles/globals.css";
import { StateContext } from "@/context/stateContext";
import { Layout } from "../components";
import amplifyConfig from "@/aws-exports";

Amplify.configure(amplifyConfig);

export default function App({ Component, pageProps }: AppProps) {
  return (
    <StateContext>
      <Authenticator>
        {({ signOut, user }) => (
          <Layout user={user} signOut={signOut}>
            <Toaster />
            <Component {...pageProps} />
          </Layout>
        )}
      </Authenticator>
    </StateContext>
  );
}
