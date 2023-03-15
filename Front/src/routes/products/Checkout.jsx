import React from 'react';
import CheckoutOrders from '../../components/CheckoutOrders';
import '../../css/routes/products/Checkout.css';

export default function Checkout() {
  return (
    <section className="checkout-container-main">
      <CheckoutOrders />
    </section>
  );
}
