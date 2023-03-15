const getTotalPrice = (products, productsInCart) => products.reduce((acc, e) => {
  const productPrice = e.price;
  const quantityInCart = productsInCart.find((el) => el.id === e.id).quantity;

    let acumulator = acc;

    acumulator += quantityInCart * productPrice;
    return acumulator;
  }, 0);
  
  module.exports = { getTotalPrice };
