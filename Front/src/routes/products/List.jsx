// Listar todos os produtos
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../../components/Card';
import { requestGet, setToken } from '../../services/request';
import '../../css/routes/products/List.css';
import ButtonCheckout from '../../components/ButtonCheckout';

export default function List() {
  const [products, setProducts] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // salva boolean da autenticação
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const { token } = JSON.parse(localStorage.getItem('user') || '');
      if (!token) return navigate('/login');
      setToken(token);
      await requestGet('/products')
        .then((response) => {
        // handle success
          setProducts(response);
        })
        .then(() => {
          setIsAuthenticated(true);
        })
        .catch(() => navigate('/login'));
    })();
  }, [navigate]); // similar ao DidMount

  return (
    <section className="list-products-cotnainer">
      {isAuthenticated && (
        products.map((product) => (
          <Card
            key={ product.id }
            product={ product }
          />
        )))}
      <ButtonCheckout />
    </section>
  );
}
