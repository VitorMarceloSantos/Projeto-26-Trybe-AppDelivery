// Verificar Usuário Existente
const { schemaVerify } = require('./schema');

const validateUser = (req, res, next) => {
  const { email, password } = req.body;

  const { error } = schemaVerify.validate({ email, password });
  if (error) {
    return res.status(404).json({ message: error.message });
  }
  return next();
};

module.exports = { validateUser };
