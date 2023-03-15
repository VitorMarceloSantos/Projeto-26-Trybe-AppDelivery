// Verificar as credenciais do Usuário para login
const md5 = require('md5');
const { findEmail } = require('../services/login.service');

const verifyLogin = async (req, res, next) => {
  const { email, password } = req.body;
  const { status, message } = await findEmail(email); // fazendo requisição API
  const passwordInMd5 = md5(password);

  if (status === 200 && (message.user.password === passwordInMd5)) { // caso o email e senha sejam válidos
    return next();
  }
  return res.status(404).json({ status: 404, message: 'Not found verify' });
};
  
  module.exports = {
    verifyLogin,
  };
