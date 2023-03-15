const express = require('express');
const longinController = require('../controllers/login.controller');
const { validateUser } = require('../middlewares/validations/validateUser');
const { verifyLogin } = require('../middlewares/verifyLogin');
const { validateLogin } = require('../utils/validateLogin');

const router = express.Router();

// Usuario logado com Sucesso
// const userSucess = (_req, res) => res
// .status(200).json({ status: 200, message: 'Usuário Logado com Sucesso' });

// Rotas Globais
// router.use(validateUser);

// Rotas Get
router.get('/login', validateUser, longinController.findAll);
// router.get('/:id', longinController.findId);

// Rotas Posts
router.post('/login', verifyLogin, longinController.findEmail);

// Rota ValidateToken(caso o usário já esteja logado)
router.post('/login/validate', validateLogin);

module.exports = router;