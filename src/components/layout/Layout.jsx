import React from 'react';
import Top from '../layout/top/top';
import Footer from '../layout/footer/footer';
import { Outlet } from 'react-router-dom';

function Layout() {
    return (
        <>
            <header>
                <Top />
            </header>
            <main>
                <Outlet />
            </main>
            <footer>
                <Footer />
            </footer>
        </>
    )
}

export default Layout