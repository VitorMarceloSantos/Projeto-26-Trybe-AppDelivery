import React, { useState, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import contextProducts from './ContextProduct';

function ProviderProducts({ children }) {
  const [listProducts, setListProducts] = useState([]);

  // https://beta.reactjs.org/reference/react/useCallback
  // useCallback um React Hook que permite armazenar em cache uma definição de função entre re-renderizações.
  const addProducts = useCallback((newListProduct) => { // adiciona um novo produto ao array listProducts(Context)
    setListProducts(newListProduct);
  }, []);

  // // utiliza o useMemo como se fosse um useEffect
  const valueContext = useMemo(() => (
    { listProducts, addProducts }
  ), [listProducts, addProducts]);

  return (
    <contextProducts.Provider value={ valueContext }>
      { children }
    </contextProducts.Provider>
  );
}

ProviderProducts.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProviderProducts;
