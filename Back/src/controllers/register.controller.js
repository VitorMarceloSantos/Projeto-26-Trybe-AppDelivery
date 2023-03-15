const registerService = require('../services/register.service');

const createUser = async (req, res) => {
  const user = req.body;
  const { status, message, token } = await registerService.createUser(user);

  const { password: PASSWORD, ...payload } = message.user;
  return res.status(status).json({ status: 201, message: { ...payload, token } });
};

const registerNewUser = async (req, res) => {
  const user = req.body;
  const { status, message } = await registerService.registerNewUser(user);

  return res.status(status).json({ status, message });
};

module.exports = {
  createUser,
  registerNewUser,
};