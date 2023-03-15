// Verificar Novo Usuário
const { schemaUser } = require('./schema');

const validateNewUser = (req, res, next) => {
  const { role: _, ...user } = req.body; // descartando o role, pois o mesmo não é obrigatório na validação
  const { error } = schemaUser.validate({ ...user });
  if (error) {
    return res.status(404).json({ message: error.message });
  }
  return next();
};

module.exports = { validateNewUser };