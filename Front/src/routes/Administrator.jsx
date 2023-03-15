import React from 'react';
import { Outlet } from 'react-router';
import Footer from '../components/Footer';
import NavBarAdm from '../components/NavBarAdm';

export default function Administrator() {
  return (
    <section className="products-page">
      <div className="navBar-sellers-container">
        <NavBarAdm />
      </div>
      <div className="outlet-container">
        <Outlet />
      </div>
      <div className="footer-container">
        <Footer />
      </div>
    </section>
  );
}
