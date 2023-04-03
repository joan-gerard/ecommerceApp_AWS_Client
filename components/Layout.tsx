import React, { ReactElement } from "react";
import Head from "next/head";
import { AuthEventData, AmplifyUser } from "@aws-amplify/ui";

import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = ({
  children,
}: {
  children: ReactElement[];
}) => {
  return (
    <div className="layout">
      <Head>
        <title>My E-comm Store</title>
      </Head>
      <header>
        <Navbar />
      </header>
      <main className="main-container">{children}</main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default Layout;
