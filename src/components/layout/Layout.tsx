import React from "react";
import Top from "../layout/top/top";
import Footer from "../layout/footer/footer";
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
