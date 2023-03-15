import React from 'react';
import { Outlet } from 'react-router';
import Footer from '../components/Footer';
import NavBarSeller from '../components/NavBarSeller';
import '../css/routes/Sellers.css';

export default function Sellers() {
  return (
    <section className="products-page">
      <div className="navBar-sellers-container">
        <NavBarSeller />
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
