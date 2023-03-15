// Verificar se Usuário existe
const { findUser } = require('../services/login.service');

const verifyUser = async (req, res, next) => {
  const { name, email } = req.body;
  const { status } = await findUser(name, email); // fazendo requisição API

  if (status === 404) { // caso usário não exista, poderá criar um novo Usuário
    return next();
  }
  return res.status(409).json({ message: 'Conflict' });
};
  
  module.exports = {
    verifyUser,
  };
