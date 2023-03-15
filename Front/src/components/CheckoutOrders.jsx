import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import contextProducts from '../context/ContextProduct';
import TableCheckout from './TableCheckout';
import '../css/components/CheckoutOrders.css';
import { requestPost, setToken } from '../services/request';
import SellersRegister from './SellersRegister';

function CheckoutOrders() {
  const { listProducts, addProducts } = useContext(contextProducts); // utilizando o contextAPI(pode ser acessado em qualquer lugar de Products)
  const [checkoutValue, setCheckoutValue] = useState(0);
  const [addressClient, setAddressClient] = useState('');
  const [addressNumber, setAddressNumber] = useState('');
  const [sellerId, setSellerId] = useState(''); // Esperar rota banco de dados
  const CUSTOMER = 'customer_checkout';
  const navigate = useNavigate();

  // Atualizando o total do Checkout
  useEffect(() => {
    (function updateValue() {
      const temp = listProducts
        .reduce((acc, current) => acc + (current.price * current.quantity), 0);
      setCheckoutValue(temp);
    }());
  }, [listProducts]);

  const returnIdClient = () => {
    if (localStorage.getItem('user')) { // verifica se existe o user no storage
      return (JSON.parse(localStorage.getItem('user')).id);
    }
  };

  const handleAddress = ({ target: { value, name } }) => { // inserindo o endereço e o número
    if (name === 'address') setAddressClient(value);
    else setAddressNumber(value);
  };

  const saleProducts = () => {
    const arrayProducts = listProducts.map((product) => (
      {
        id: product.id,
        quantity: product.quantity,
      }
    ));
    return arrayProducts;
  };

  const handleCreateSale = async () => {
    const id = returnIdClient(); // retorna id do cliente
    const order = {
      userId: id,
      sellerId, // Esperar rota banco de dados(sellerName)
      deliveryAddress: addressClient,
      deliveryNumber: addressNumber,
      productsInCart: saleProducts(),
    };

    try {
      const { token } = JSON.parse(localStorage.getItem('user') || false);
      if (!token) return navigate('/login'); // retornando a tela inicial caso o token não seja válido, ou não tenha token
      setToken(token);
      await requestPost('/sales', order) // criando uma nova venda
        .then(async (response) => { // recebe o id da venda criada
          console.log('Response', response);
          localStorage.removeItem('products'); // limpando localStorage
          addProducts([]); // limpando contextApi
          navigate(`/customer/orders/${response.saleId}`); // navegar para o pedido criado
        });
    } catch (error) {
      console.log('Error:', error);
      navigate('/login');
    }
  };

  return (
    <section className="main-order-checkout">
      <section className="checkout-order-container">
        <h3>Pedido</h3>
        <TableCheckout />
        { listProducts.length > 0 && (
          <div className="checkout-order-price">
            <p>Total:</p>
            <p
              className="chekcout-total-price"
              data-testid={ `${CUSTOMER}__element-order-total-price` }
            >
              {`R$ ${String(checkoutValue.toFixed(2)).replace('.', ',')}`}
            </p>
          </div>
        )}
      </section>
      <section className="checkout-details-container">
        <h3>Endereço para Entrega</h3>
        <div className="divInputInfo">
          <SellersRegister
            setSellerId={ setSellerId }
          />
          <label className="inputInfo config-order-input" htmlFor="endereco">
            Endereço:
            <input
              type="text"
              id="endereco"
              name="address"
              value={ addressClient }
              data-testid={ `${CUSTOMER}__input-address` }
              onChange={ handleAddress }
              className="config-input-info"
              placeholder="Rua, Avenida, Praça, ..."
            />
          </label>
          <label className="inputInfo" htmlFor="numero">
            Número:
            <input
              type="number"
              id="numero"
              name="addressNumber"
              value={ addressNumber }
              data-testid={ `${CUSTOMER}__input-address-number` }
              onChange={ handleAddress }
              className="config-input-info"
              placeholder="..."
            />
          </label>
        </div>
      </section>
      <div className="button-checkout-order-container">
        <button
          type="button"
          data-testid={ `${CUSTOMER}__button-submit-order` }
          onClick={ handleCreateSale }
        >
          Finalizar
        </button>
      </div>
    </section>
  );
}
export default CheckoutOrders;
