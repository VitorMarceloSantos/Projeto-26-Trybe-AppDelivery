// Vendedores cadastrados
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { requestGet, setToken } from '../services/request';

export default function SellersRegister(props) {
  const { setSellerId } = props; // alterando o nome no CheckoutOrders
  const [sellers, setSellers] = useState([]);
  const CUSTOMER = 'customer_checkout';

  useEffect(() => {
    (async () => {
      try {
        const { token } = JSON.parse(localStorage.getItem('user') || false);
        setToken(token);
        await requestGet('/users/sellers')
          .then((response) => {
            setSellers(['', ...response]); // adiciona um valor default no inicio[0]
          });
      } catch (error) {
        console.log('Error:', error);
      }
    }
    )();
  }, [setSellers]);

  const selectedSeller = ({ target: { value } }) => {
    setSellerId(value);
  };
  return (
    <section>
      <label className="inputInfo" htmlFor="vendedora">
        Vendedor(a):
        <select
          data-testid={ `${CUSTOMER}__select-seller` }
          onChange={ selectedSeller }
          className="config-input-info"
        >
          {sellers.map(({ id, name }, index) => (
            <option
              key={ index }
              id={ id }
              value={ id }
            >
              {name}
            </option>))}
        </select>
      </label>
    </section>
  );
}

SellersRegister.propTypes = {
  setSellerId: PropTypes.func.isRequired,
};
