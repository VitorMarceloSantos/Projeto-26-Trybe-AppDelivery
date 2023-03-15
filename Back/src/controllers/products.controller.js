const Status = require('http-status');
const productsService = require('../services/products.service');

const getAllProducts = async (_req, res) => {
  const { status, message } = await productsService.findAll();

  return res.status(status).json(message);
};

const searchProduct = async (req, res) => {
  const { name } = req.params;
  const { status, message } = await productsService.searchProduct(name);
  
  if (status === 404) {
    return res.status(status).json(message);
  }
  
  return res.status(status).json(message);
};

const findProductsBySale = async (req, res) => {
  const { id } = req.params;
  try {
    const products = await productsService.findProductsBySale(id);
    return res.status(Status.OK).json(products);
  } catch (e) {
    return res.status(Status.BAD_REQUEST).json({ message: e.message });
  }
};

module.exports = {
  getAllProducts,
  searchProduct,
  findProductsBySale,
};