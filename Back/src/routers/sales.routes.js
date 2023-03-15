const express = require('express');
const Sales = require('../controllers/sales.controller');
const { validateToken } = require('../jwt/validateToken');
// const Auth = require('../middlewares/validations/auth');

const routes = express.Router();

routes.post('/sales', validateToken, Sales.createSale);
routes.get('/sales/:id', validateToken, Sales.findSaleById);

module.exports = routes;
