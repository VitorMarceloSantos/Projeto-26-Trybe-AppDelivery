const { Op } = require('sequelize'); // para realizar operações com o sequelize
const { User } = require('../database/models');
const { generateToken } = require('../jwt/generateToken');

const findAll = async () => {
  const result = await User.findAll();
  if (!result) return { status: 404, message: 'Not found' };
  return { status: 200, message: result }; // case false
};

const findEmail = async (email) => {
  const result = await User.findOne({ where: { email } });
  if (!result) return { status: 404, message: 'Not found' };
  const token = generateToken(result.dataValues); // gerando token
  return { status: 200, message: { user: result.dataValues }, token };
};

const findUser = async (name, email) => {
  const result = await User.findAll({ where: { [Op.or]: [{ name }, { email }] } });
  if (result.length === 0) return { status: 404, message: 'Not found' };
  return { status: 200, message: result }; // case false
};

module.exports = {
  findAll,
  findUser,
  findEmail,
};