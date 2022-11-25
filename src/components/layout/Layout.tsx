import React from "react";
import Top from "./Top/Top";
import Footer from "./Footer/Footer";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <>
      <Top />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default Layout;
