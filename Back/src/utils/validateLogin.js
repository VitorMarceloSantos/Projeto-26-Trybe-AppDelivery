const jwt = require('jsonwebtoken');
const { secret } = require('../jwt/jwtConfig');

// Validando token, retorna true or false
const validateLogin = async (req, res, _next) => {
  const { authorization: token } = req.headers; // alterando o nome para token
  try {
    // Fazendo a decodificação
    jwt.verify(token, secret);
    return res.status(200).json({ status: 200, message: 'Logado com sucesso' });
  } catch (err) {
    return res.status(404).json({ status: 404, message: 'Erro ao fazer login' }); // caso o token seja invalido vai cair nesse caso
  }
};

module.exports = {
  validateLogin,
};