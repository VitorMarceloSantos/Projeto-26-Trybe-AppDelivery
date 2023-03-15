import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import '../../css/routes/products/Order.css';
import { requestGet } from '../../services/request';
import CartEmpty from '../../images/CartEmpty.png';

export default function OrdersSeller() {
  const CUSTOMER = 'seller_orders';
  const [listSales, setListSales] = useState([]);
  const navigate = useNavigate();

  const returnIdSeller = () => {
    if (localStorage.getItem('user')) { // verifica se existe o user no storage
      return (JSON.parse(localStorage.getItem('user')).id);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const id = returnIdSeller();
        await requestGet(`orders/seller/${id}`) // buscando as vendas realizadas pelo vendedor
          .then((response) => {
            setListSales(response);
          });
      } catch (error) {
        console.log('Error:', error);
      }
    }
    )();
  }, [setListSales]);

  const editDate = (date) => {
    const regexAno = /^(\d{4})-/;
    const [ano] = date.match(regexAno).slice(1);
    const regexMesDia = /^(\d{4})-(\d{2})-(\d{2})/;
    const [, , mes, dia] = date.match(regexMesDia);
    return `${dia}/${mes}/${ano}`;
  };

  // Adicionando zeros a esquerda(Tamanho máximo do pedido 4 digitos)
  const editNumberOrder = (id) => {
    const idString = String(id);
    const NUMBER_FOUR = 4;
    let count = idString.length;
    let idWithZero = idString;

    while (count < NUMBER_FOUR) {
      idWithZero = `0${idWithZero}`;
      count += 1;
    }
    return idWithZero;
  };

  // Redirecionando para a tela de pedido pelo ID
  const seletctedCardId = ({ target: { id } }) => {
    navigate(`/seller/orders/${id}`);
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
    <section className="orders-container">
      <div className="cards-orders-container">
        <h3>Vendas Efetuadas</h3>
        {listSales.length === 0 ? (
          <img src={ CartEmpty } alt="Cart Empty" />
        ) : (
          listSales.map(({
            id,
            status,
            saleDate,
            totalPrice,
            deliveryAddress,
            deliveryNumber,
          }, index) => (
            <button
              type="button"
              key={ index }
              onClick={ seletctedCardId }
              id={ id }
              className="button-card-container"
            >
              <p
                className="pedidoId card-config"
                data-testid={ `${CUSTOMER}__element-order-id-${id}` }
                id={ id }
              >
                Pedido
                <br />
                {editNumberOrder(id)}
              </p>
              <p
                className="status card-config"
                data-testid={ `${CUSTOMER}__element-delivery-status-${id}` }
                id={ id }
                style={ modifyColor(status) }
              >
                {status}
              </p>
              <div className="divDatePrice card-config">
                <p
                  data-testid={ `${CUSTOMER}__element-order-date-${id}` }
                  id={ id }
                >
                  {editDate(saleDate)}
                </p>
                <p
                  data-testid={ `${CUSTOMER}__element-card-price-${id}` }
                  id={ id }
                >
                  {`R$ ${totalPrice.replace('.', ',')}`}
                </p>
              </div>
              <p
                className="adress-sales"
                data-testid={ `${CUSTOMER}__element-card-address-${id}` }
              >
                {`${deliveryAddress}, ${deliveryNumber}`}
              </p>
            </button>
          ))
        )}
      </div>
    </section>
  );
}
