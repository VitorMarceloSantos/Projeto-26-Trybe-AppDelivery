// Verificar Novo Usuário
const { schemaUser } = require('./schema');

const validateNewUser = (name, email, password) => {
  const { error } = schemaUser.validate({ name, email, password });
  return !error; // retorna true or false
};

module.exports = { validateNewUser };
