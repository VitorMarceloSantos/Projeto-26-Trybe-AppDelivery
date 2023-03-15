import { Outlet } from 'react-router';
import Footer from '../components/Footer';
import NavBarClient from '../components/NavbarClient';
import '../css/routes/Products.css';
import ProviderProducts from '../context/ProviderProduct';

export default function Products() {
  return (
    // Provider tem acesso apenas aos filhos do rota Products
    <ProviderProducts>
      <section className="products-page">
        <div className="navBar-products-container">
          <NavBarClient />
        </div>
        <div className="outlet-container">
          <Outlet />
        </div>
        <div className="footer-container">
          <Footer />
        </div>
      </section>
    </ProviderProducts>
  );
}
