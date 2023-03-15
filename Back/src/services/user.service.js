const { Op } = require('sequelize');
const { User } = require('../database/models');

const findAllUsers = async () => User
  .findAll({
    where: {
      [Op.or]: [{ role: 'seller' }, { role: 'customer' }],
    },
    attributes: { exclude: ['password', 'productId'] },
  });

const findAllCustomers = async () => User
  .findAll({ where: { role: 'customer' }, attributes: { exclude: ['password', 'productId'] } });

const findAllSellers = async () => User
  .findAll({ where: { role: 'seller' }, attributes: { exclude: ['password', 'productId'] } });

const deleteUser = async (id) => {
  const user = await User
    .findOne({
      where: { id },
      attributes: { exclude: ['password', 'productId'] },
    });
  if (!user) {
    throw new Error('User not found');
  }
  await user.destroy();
  return user.dataValues.id;
};

const findSellers = async (id) => {
  const user = await User
    .findOne({
      where: { id, role: 'seller' },
      attributes: { exclude: ['password', 'productId'] },
    });
  return user;
};

module.exports = { findAllUsers, findAllCustomers, deleteUser, findSellers, findAllSellers };