const jwt = require('jsonwebtoken');
const { config, secret } = require('./jwtConfig');

const generateToken = (user) => {
  const { password: PASSWORD, ...payload } = user; // retirando o password
  const token = jwt.sign({ payload }, secret, config);
  return token;
};

module.exports = { generateToken };
