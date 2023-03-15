const express = require('express');
const User = require('../controllers/user.controller');
const { validateToken } = require('../jwt/validateToken');
const { validateRole } = require('../middlewares/verifyRole');

const routes = express.Router();

routes.get('/users', validateToken, User.findAllUsers);
routes.get('/users/customers', validateToken, User.findAllCustomers);
routes.get('/users/sellers', User.findAllSellers);
routes.get('/users/sellers/:id', validateToken, User.findSellers);
routes.delete('/users/:id', validateToken, validateRole, User.deleteUser);

module.exports = routes;