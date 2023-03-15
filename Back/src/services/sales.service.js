const { Products, User, Sale } = require('../database/models');
const { getTotalPrice } = require('./utils/Sales.utils');
const { createSaleTransaction } = require('./utils/createSaleTransiction.utils');
// products/sales/1

const createSale = async (data) => {
  const products = await Products.findAll({
    where: { id: data.productsInCart.map(({ id }) => id) } }); // busca no db os produtos enviados no array productsInCart
  const totalPrice = getTotalPrice(products, data.productsInCart);

  const sale = await createSaleTransaction({
    userId: data.userId,
    sellerId: data.sellerId,
    totalPrice: Number(totalPrice.toFixed(2)),
    deliveryAddress: data.deliveryAddress,
    deliveryNumber: data.deliveryNumber,
    saleDate: new Date(),
    productsInCart: data.productsInCart,
  });
  return sale;
};

const findSaleById = async (id) => {
  const sale = await Sale.findAll({
    where: { id },
    include: [
      {
        model: User,
        as: 'saleId',
        attributes: { exclude: ['password', 'email', 'role', 'id'] },
      },
      {
        model: User,
        as: 'seller',
        attributes: { exclude: ['password', 'email', 'role', 'id'] },
      },
    ],
    attributes: { exclude: ['userId', 'deliveryAddress', 'deliveryNumber'] },
  });
  return sale;
};

const findAll = async (id) => Sale.findAll({
  where: { userId: Number(id) },
  attributes: { exclude: ['userId', 'sellerId', 'deliveryAddress', 'deliveryNumber'] },
});

const findAllSellerOrders = async (id) => {
  const orders = await Sale.findAll({ where: { sellerId: Number(id) } });
  return orders;
};

const findOneSellerOrder = async (sellerId, saleId) => {
  const order = await Sale.findAll({ where: { sellerId, id: saleId } });
  return order;
};

const sellerUpdateSaleStatus = async (data) => {
  const orderUpdated = await Sale.update({
    status: data.newStatus,
  }, { where: { id: data.saleId } });
  return orderUpdated;
};

const buyerUpdateSaleStatus = async (data) => {
  const orderUpdate = await Sale.update({
    status: data.newStatus,
  }, { where: { id: data.saleId } });
  return orderUpdate;
};

module.exports = {
  createSale,
  findSaleById,
  findAll,
  findAllSellerOrders,
  findOneSellerOrder,
  sellerUpdateSaleStatus,
  buyerUpdateSaleStatus,
};
