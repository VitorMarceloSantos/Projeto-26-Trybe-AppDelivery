import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router'; // Pegar o parâmetro da URL
import '../../css/routes/products/OrderId.css';
import { requestGet, setToken, requestPut } from '../../services/request';

export default function OrderId() {
  const [saleId, setSaleId] = useState('');
  const [products, setProducts] = useState([]);
  const { id, totalPrice, saleDate } = saleId;
  const [verifyStatus, setVerifyStatus] = useState('');
  const { id: idUrl } = useParams(); // retorna o Id da URL
  const CUSTOMER = 'seller_order_details';
  const CUSTOMER_ORDER = `${CUSTOMER}__element-order`;

  useEffect(() => {
    (async () => {
      try {
        const { token } = JSON.parse(localStorage.getItem('user') || false);
        setToken(token);
        await requestGet(`/sales/${idUrl}`)
          .then((response) => {
            setSaleId(response);
            setVerifyStatus(response.status);
          })
          .then(async () => {
            await requestGet(`/products/sales/${idUrl}`)
              .then((response) => {
                setProducts(response);
              });
          });
      } catch (error) {
        console.log('Error:', error);
      }
    }
    )();
  }, [idUrl]);

  // Adicionando zeros a esquerda(Tamanho máximo do pedido 4 digitos)
  const editNumberOrder = (idParams) => {
    const idString = String(idParams);
    const NUMBER_FOUR = 4;
    let count = idString.length;
    let idWithZero = idString;

    while (count < NUMBER_FOUR) {
      idWithZero = `0${idWithZero}`;
      count += 1;
    }
    return idWithZero;
  };

  const editDate = (date) => {
    const regexAno = /^(\d{4})-/;
    const [ano] = date.match(regexAno).slice(1);
    const regexMesDia = /^(\d{4})-(\d{2})-(\d{2})/;
    const [, , mes, dia] = date.match(regexMesDia);
    return `${dia}/${mes}/${ano}`;
  };

  const updateState = async (statusOrder) => {
    const { token } = JSON.parse(localStorage.getItem('user') || false);
    setToken(token);
    await requestPut(`/orders/seller/${id}/${statusOrder}`, {})
      .then(({ newStatus }) => {
        setVerifyStatus(newStatus);
      });
  };

  // Atlerando o background do elemento Status
  const modifyColor = (status) => {
    switch (status) {
    case 'Pendente':
      return { backgroundColor: 'rgb(242, 39, 39)' };
    case 'Preparando':
      return { backgroundColor: 'rgb(242, 185, 15)' };
    case 'Em Trânsito':
      return { backgroundColor: 'rgb(191, 126, 4)' };
    case 'Entregue':
      return { backgroundColor: 'rgb(3, 166, 14)' };
    default:
      console.log('Error: Color Selected');
    }
  };

  return (
    <div className="conatiner-order-id-geral">
      {(saleId && products.length !== 0) ? (
        <div className="order-id-container">
          <div className="details-order-id">
            <h1>Detalhe do Pedido</h1>
            <p
              className="container-status-order-id"
              data-testid={ `${CUSTOMER_ORDER}-details-label-delivery-status` }
              style={ modifyColor(verifyStatus) }
            >
              {verifyStatus}
            </p>
          </div>
          <div className="divDadosPedido">
            <p
              className="number-order-id"
              data-testid={ `${CUSTOMER_ORDER}-details-label-order-id` }
            >
              {`PEDIDO n° ${editNumberOrder(id)}`}
            </p>
            <p
              data-testid={ `${CUSTOMER_ORDER}-details-label-order-date` }
            >
              {`Data: ${editDate(saleDate)}`}
            </p>
            <div
              className="container-order-id-date"
            >
              <button
                data-testid={ `${CUSTOMER}__button-preparing-check` }
                type="button"
                onClick={ () => updateState('Preparando') }
                disabled={ verifyStatus !== 'Pendente' }
                className="order-id-button"
              >
                PREPARAR PEDIDO
              </button>
              <button
                data-testid={ `${CUSTOMER}__button-dispatch-check` }
                type="button"
                disabled={ verifyStatus !== 'Preparando' }
                onClick={ () => updateState('Em-Trânsito') }
                className="order-id-button"
              >
                SAIU PARA ENTREGA
              </button>
            </div>
          </div>
          <table className="tableCar">
            <thead>
              <tr>
                <th className="thItem">Item</th>
                <th>Descrição</th>
                <th>Quantidade</th>
                <th>Valor Unitário</th>
                <th>Sub-total</th>
              </tr>
            </thead>
            <tbody>
              {products.map(({ products: productsId, quantity }, index) => (
                <tr key={ index }>
                  <td
                    className="tdItem"
                    data-testid={ `${CUSTOMER_ORDER}-table-item-number-${index}` }
                  >
                    {index + 1}
                  </td>
                  <td
                    className="tdDescricao"
                    data-testid={ `${CUSTOMER}__element-order-table-name-${index}` }
                  >
                    {productsId.name}
                  </td>
                  <td
                    className="tdQuantidade"
                    data-testid={ `${CUSTOMER}__element-order-table-quantity-${index}` }
                  >
                    {productsId.quantity}
                  </td>
                  <td
                    className="tdPrice"
                    data-testid={ `${CUSTOMER}__element-order-table-unit-price-${index}` }
                  >
                    {/* {(productsId.price).replace('.', ',')} */}
                    {Number(productsId.price)
                      .toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                  </td>
                  <td
                    className="tdSubtotal"
                    data-testid={ `${CUSTOMER}__element-order-table-sub-total-${index}` }
                  >
                    {/* {String((quantity * productsId.price).toFixed(2)).replace('.', ',')} */}
                    {Number(quantity * productsId.price)
                      .toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="container-total-order-id">
            <p
              className="chekcout-total-price"
              data-testid={ `${CUSTOMER}__element-order-total-price` }
            >
              {/* {totalPrice.replace('.', ',')} */}
              {Number(totalPrice)
                .toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </p>
          </div>
        </div>
      ) : (
        <h3>Carregando</h3>
      ) }
    </div>
  );
}
