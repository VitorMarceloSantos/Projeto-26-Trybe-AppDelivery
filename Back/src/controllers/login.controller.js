const loginService = require('../services/login.service');

const findAll = async (_req, res) => {
  // const { email, password } = req.body;
  const { status, message } = await loginService.findAll();
  if (status === 404) return res.status(status).json({ message });
  return res.status(status).json({ message });
};

const findEmail = async (req, res) => {
  const { email } = req.body;
  const { status, message, token } = await loginService.findEmail(email);
  if (status === 404) return res.status(status).json({ message });
  const { password: PASSWORD, ...payload } = message.user;
  return res.status(status).json({ status: 200, message: { ...payload, token } });
};

const findUser = async (req, res) => {
  const { name, email } = req.body;
  const { status, message } = await loginService.findUser(name, email);
  if (status === 404) return res.status(status).json({ message });
  return res.status(status).json({ message });
};

module.exports = {
  findAll,
  findUser,
  findEmail,
};