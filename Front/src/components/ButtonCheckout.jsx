import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import contextProducts from '../context/ContextProduct';
import '../css/components/ButtonCheckout.css';

export default function ButtonCheckout() {
  const { listProducts } = useContext(contextProducts); // utilizando o contextAPI(pode ser acessado em qualquer lugar de Products)
  const [checkoutValue, setCheckoutValue] = useState(0);
  const navigate = useNavigate(); // instanciando para utilizar o navegate(alterar rota)

  useEffect(() => {
    (function updateValue() {
      const temp = listProducts
        .reduce((acc, current) => acc + (current.price * current.quantity), 0);
      setCheckoutValue(temp);
    }());
  }, [listProducts]);

  const navigateCheckout = () => {
    localStorage.setItem('products', JSON.stringify(listProducts)); // criando storage products
    navigate('/customer/checkout'); // redirecionando para a rota checkout(OBS: utiliza a barra antes de customer para voltar a raíz, caso contrário a rota partiria de /customer/product)
  };

  return (
    <button
      type="button"
      disabled={ checkoutValue === 0 }
      className="button-checkout-container"
      data-testid="customer_products__button-cart"
      onClick={ navigateCheckout }
    >
      <div className="checkout-value-container">
        <p>Total:</p>
        <p
          data-testid="customer_products__checkout-bottom-value"
          className="button-checkout-value"
        >
          {/* {String(checkoutValue.toFixed(2)).replace('.', ',')} */}
          {Number(checkoutValue)
            .toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
        </p>
      </div>
    </button>
  );
}
