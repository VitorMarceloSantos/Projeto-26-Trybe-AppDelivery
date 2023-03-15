const validateRole = (req, res, next) => {
  const { role } = req.body.user.payload; // informação salva quando há a descriptografia do token

  if (role !== 'administrator') { // somento administrator podeŕa ter acesso a rota
    return res.status(404).json({ message: 'User not authorized' });
  }
  return next();
};

module.exports = { validateRole };