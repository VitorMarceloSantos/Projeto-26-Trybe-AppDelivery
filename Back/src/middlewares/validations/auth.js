const status = require('http-status');
const jwt = require('jsonwebtoken');
const fs = require('fs');

const SECRET_JWT = fs.readFileSync('./jwt.evaluation.key', { encoding: 'utf-8' });
const verifyToken = (token) => {
    const data = jwt.verify(token, SECRET_JWT);
  
    return data;
  };

const Auth = (req, res, next) => {
  const { authorization } = req.headers;

    if (!authorization) {
      throw Object(
        { status: status.UNAUTHORIZED, message: 'Token não informado' },
      );
    }
    try {
      const dados = verifyToken(authorization);
      req.user = dados;
      next();
    } catch (error) {
      throw Object(
        { status: status.UNAUTHORIZED,
          message: 'Token inválido' },
      );
    }
};

module.exports = Auth;
