import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";

import "@/styles/globals.css";
import { StateContext } from "@/context/stateContext";
import { Layout } from "../components";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <StateContext>
      <Layout>
        <Toaster />
        <Component {...pageProps} />
      </Layout>
    </StateContext>
  );
}
