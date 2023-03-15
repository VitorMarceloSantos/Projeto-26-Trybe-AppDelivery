const express = require('express');
const Sales = require('../controllers/sales.controller');

const routes = express.Router();

routes
    .get('/orders/:id', Sales.findAll)
    .get('/orders/seller/:sellerId/', Sales.findAllSellerOrders)
    .get('/orders/seller/:sellerId/:saleId', Sales.findOneSellerOrder)
    .put('/orders/seller/:saleId/:newStatus', Sales.sellerUpdateSaleStatus)
    .put('/orders/buyer/:saleId/:newStatus', Sales.buyerUpdateSaleStatus);
    
module.exports = routes;