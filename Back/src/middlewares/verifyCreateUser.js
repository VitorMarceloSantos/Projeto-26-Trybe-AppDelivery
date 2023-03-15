const { schemaNewUser } = require('./validations/schema');

const validateCreate = (req, res, next) => {
  const { ...user } = req.body;
  const { error } = schemaNewUser.validate({ ...user });
  if (error) {
    return res.status(404).json({ message: error.message });
  }
  return next();
};

module.exports = { validateCreate };