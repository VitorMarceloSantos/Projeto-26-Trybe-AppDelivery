const express = require('express');
const productsController = require('../controllers/products.controller');
const { validateToken } = require('../jwt/validateToken');

const router = express.Router();

router
    .get('/products', validateToken, productsController.getAllProducts)
    .get('/products/search/:name', validateToken, productsController.searchProduct)
    .get('/products/sales/:id', validateToken, productsController.findProductsBySale);

module.exports = router;