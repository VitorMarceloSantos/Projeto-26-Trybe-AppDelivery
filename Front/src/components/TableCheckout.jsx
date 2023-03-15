import React, { useContext, useState } from 'react';
import { BsTrash } from 'react-icons/bs';
import contextProducts from '../context/ContextProduct';
import '../css/components/TableCheckout.css';
import cartEmpty from '../images/CartEmpty.png';

export default function TableCheckout() {
  const { listProducts, addProducts } = useContext(contextProducts); // utilizando o contextAPI(pode ser acessado em qualquer lugar de Products)
  const [arrayProducts, setArrayProducts] = useState(listProducts);
  const CUSTOMER = 'customer_checkout';

  // Remover determinado produto do array
  const RemoveProduct = (nameParams) => {
    const temp = arrayProducts.filter((product) => product.name !== nameParams);
    setArrayProducts(temp); // Remove o elemento na posição id
    addProducts(temp); // atualizando contextAPI - Products
    // Removendo localStorage antigo, e adicionando novo após modificações
    localStorage.removeItem('products');
    localStorage.setItem('products', JSON.stringify(temp));
  };

  return (
    <section className="table-container">
      {arrayProducts.length === 0 ? (
        <img src={ cartEmpty } alt="Cart Empty" className="img-cart" />
      ) : (
        <table className="tableCar">
          <thead>
            <tr>
              <th className="column-item">Item</th>
              <th className="column-item">Descrição</th>
              <th className="column-item">Quantidade</th>
              <th className="column-item">V. Unitário</th>
              <th className="column-item">Sub-Total</th>
              <th className="column-item"> </th>
            </tr>
          </thead>
          <tbody>
            {arrayProducts.map(({ name, quantity, price }, index) => (
              <tr key={ index }>
                <td
                  className="tdItem"
                  data-testid={ `${CUSTOMER}__element-order-table-item-number-${index}` }
                >
                  {index + 1}
                </td>
                <td
                  className="tdDescricao"
                  data-testid={ `${CUSTOMER}__element-order-table-name-${index}` }
                >
                  {name}
                </td>
                <td
                  className="tdQuantidade"
                  data-testid={ `${CUSTOMER}__element-order-table-quantity-${index}` }
                >
                  {quantity}
                </td>
                <td
                  className="tdPrice"
                  data-testid={ `${CUSTOMER}__element-order-table-unit-price-${index}` }
                >
                  {/* {String(price.toFixed(2)).replace('.', ',')} */}
                  {Number(price)
                    .toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                </td>
                <td
                  className="tdSubtotal"
                  data-testid={ `${CUSTOMER}__element-order-table-sub-total-${index}` }
                >
                  {/* {String((quantity * price).toFixed(2)).replace('.', ',')} */}
                  {Number(price * quantity)
                    .toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                </td>
                <td>
                  <button
                    className="btnRemover"
                    type="button"
                    // name={ name }
                    data-testid={ `${CUSTOMER}__element-order-table-remove-${index}` }
                    onClick={ () => RemoveProduct(name) }
                    id={ index }
                  >
                    <BsTrash
                      className="icon-trash"
                      onClick={ () => RemoveProduct(name) }
                    />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
}
