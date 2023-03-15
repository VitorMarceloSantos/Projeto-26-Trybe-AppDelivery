const express = require('express');
const { createUser, registerNewUser } = require('../controllers/register.controller');
const { validateNewUser } = require('../middlewares/validations/validateNewUser');
const { validateCreate } = require('../middlewares/verifyCreateUser');
const { validateRole } = require('../middlewares/verifyRole');
const { verifyUser } = require('../middlewares/verifyUser');
const { validateToken } = require('../jwt/validateToken');

const router = express.Router();

router.post('/register', validateNewUser, verifyUser, createUser);
router.post('/create/user', 
validateCreate, validateToken, validateRole, verifyUser, registerNewUser);

module.exports = router;