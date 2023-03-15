const { Op } = require('sequelize');
const { Products, SalesProducts } = require('../database/models');

const findAll = async () => {
  const allProducts = await Products.findAll();

  return { status: 200, message: allProducts };
};

const searchProduct = async (name) => {
  const oneProduct = await Products.findAll({ where: { name: { [Op.like]: `%${name}%` } } });

  if (!oneProduct) {
    return { status: 404, message: 'Product not found' };
  }
  
  return { status: 200, message: oneProduct };
};

const findProductsBySale = async (saleId) => {
  const products = await SalesProducts.findAll({
    where: { saleId },
    include: [
      { 
        model: Products,
        as: 'products',
        attributes: { exclude: ['urlImage'] },
      },
    ],
    attributes: { exclude: ['saleId', 'productId'] },
  });
    return products;
};

module.exports = {
  findAll,
  searchProduct,
  findProductsBySale,
};