import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { BsFillCartPlusFill, BsHeart } from 'react-icons/bs';
import '../css/components/Card.css';
import contextProducts from '../context/ContextProduct';

export default function Card(props) {
  const { product } = props; // index(referente ao map)
  const { id, name: nameProduct, price, urlImage } = product;
  const { listProducts, addProducts } = useContext(contextProducts); // utilizando o contextAPI(pode ser acessado em qualquer lugar de Products)
  const CUSTOMER = 'customer_products';

  // Verificar se o produto existe dentro do listProducts(Context)
  const verifyProducts = (productObject) => {
    let existProduct = false;
    let indexProduct = 0;
    for (let i = 0; i < listProducts.length; i += 1) { // começa na posição 1, pois os os data-test
      if (listProducts[i].id === productObject.id) { // verificando se o produto em questão(productObject) já existe no Context(Product);
        existProduct = true;
        indexProduct = i;
        break; // encerra o laço de repetição, evitando repetições desnecessárias
      }
    }
    if (existProduct) { // caso o produto já esteja adicionado
      const temp = [...listProducts];
      temp[indexProduct] = productObject;
      addProducts(temp);
    } else { // adicionando um novo produto
      const temp = [...listProducts, productObject];
      addProducts(temp);
    }
  };

  // Criando Objeto com os valores do Card
  const creatProduct = (valueObject, value, idParams) => {
    const valueImage = document.querySelector(`#image-id-${idParams}`); // selecionando o a imagem correspondente ao produto
    const valuePrice = document.querySelector(`#price-id-${idParams}`); // selecionando o preço correspondente ao produto
    const productObject = { // criando objeto com informações do produto em questão
      id: Number((valueObject.id).split('-')[2]),
      name: valueObject.name,
      price: Number(((valuePrice.textContent).split('$')[1]).replace(',', '.')), // convertendo o valor para Number
      quantity: value, // o objeto vai receber a quantidade atualizada
      urlImage: valueImage.src,
    };
    verifyProducts(productObject);
  };

  const selectedOperator = (valueObject, name, quantity, idParams) => {
    if (name === 'minus') {
      if (valueObject.value > 0) {
        const tempMinus = quantity - 1; // variável temporária que recebe o resultado da operação
        valueObject.value = tempMinus; // alterando o valor na página
        creatProduct(valueObject, tempMinus, idParams); // verificando a existencia do objeto/criando um novo objeto no listProducts(Context)
      }
    } else {
      const tempPlus = quantity + 1; // variável temporária que recebe o resultado da operação
      valueObject.value = tempPlus; // alterando o valor na página
      creatProduct(valueObject, tempPlus, idParams); // verificando a existencia do objeto/criando um novo objeto no listProducts(Context)
    }
  };

  const handlerValue = ({ target: { name, id: idParams } }) => {
    const valueObject = document.querySelector(`#card-id-${idParams}`);
    const quantity = Number(valueObject.value);
    selectedOperator(valueObject, name, quantity, idParams);
  };

  const handleInput = (idParams) => {
    const valueObject = document.querySelector(`#card-id-${idParams}`);
    const quantity = Number(valueObject.value);
    creatProduct(valueObject, quantity, idParams);
  };

  return (
    <div className="card">
      <div className="cart-favorites-container">
        <BsFillCartPlusFill className="icon-product icon-cart" />
        <BsHeart className="icon-product icon-favorite" />
      </div>
      <div className="img-product-container">
        <img
          className="img-product"
          src={ urlImage }
          alt="Imagem Produto"
          data-testid={ `${CUSTOMER}__img-card-bg-image-${id}` }
          id={ `image-id-${id}` }
        />
      </div>
      <div className="data-product-container">
        <h3
          data-testid={ `${CUSTOMER}__element-card-title-${id}` }
        >
          { nameProduct }
        </h3>
        <p
          data-testid={ `${CUSTOMER}__element-card-price-${id}` }
          id={ `price-id-${id}` }
        >
          {/* { `R$ ${price.replace('.', ',')}`} */}
          {Number(price).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
        </p>
      </div>
      <div className="options-values-container">
        <button
          className="buttonCard button-card-minus"
          type="button"
          name="minus"
          id={ id }
          onClick={ handlerValue }
          data-testid={ `${CUSTOMER}__button-card-rm-item-${id}` }
        >
          -
        </button>
        <input
          className="inputCard"
          type="number"
          min="0"
          name={ nameProduct }
          defaultValue="0"
          id={ `card-id-${id}` }
          data-testid={ `${CUSTOMER}__input-card-quantity-${id}` }
          onChange={ () => handleInput(id) }
        />
        <button
          className="buttonCard button-card-plus"
          type="button"
          name="plus"
          id={ id }
          onClick={ handlerValue }
          data-testid={ `${CUSTOMER}__button-card-add-item-${id}` }
        >
          +
        </button>
      </div>
    </div>
  );
}

Card.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    urlImage: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
  }).isRequired,
};
