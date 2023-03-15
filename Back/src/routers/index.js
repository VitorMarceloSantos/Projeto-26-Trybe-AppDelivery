const express = require('express');

const router = express.Router();

const loginRouter = require('./login.routes');
const registerRouter = require('./register.routes');
const salesRouter = require('./sales.routes');
const productsRouter = require('./products.routes');
const orders = require('./order.routes');
const users = require('./user.routes');

// Exportanto as rotas
router.use(users);
router.use(loginRouter);

router.use(orders);
router.use(salesRouter);
router.use(productsRouter);
router.use(registerRouter);

module.exports = router;