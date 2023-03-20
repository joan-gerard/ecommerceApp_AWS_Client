import React, { ReactElement } from "react";
import Head from "next/head";
import { AuthEventData, AmplifyUser } from "@aws-amplify/ui";

import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = ({
  children,
  user,
  signOut,
}: {
  children: ReactElement[];
  user: AmplifyUser | undefined;
  signOut: ((data?: AuthEventData | undefined) => void) | undefined;
}) => {
  return (
    <div className="layout">
      <Head>
        <title>My E-comm Store</title>
      </Head>
      <header>
        <Navbar signOut={signOut} />
      </header>
      <main className="main-container">{children}</main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default Layout;
