// Verificar Usuário Existente
const { schemaVerify } = require('./schema');

const validateUser = (email, password) => {
  const { error } = schemaVerify.validate({ email, password });
  return !error; // retorna true or false
};

module.exports = { validateUser };
