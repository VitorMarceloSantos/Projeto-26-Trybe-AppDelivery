const status = require('http-status');
const userService = require('../services/user.service');

const findAllUsers = async (_req, res) => {
    try {
    const users = await userService.findAllUsers();
    return res.status(status.OK).json(users);
    } catch (e) {
     return res.status(status.BAD_REQUEST).json({ message: e.message });
   }
};

const findAllCustomers = async (_req, res) => {
    try {
    const customers = await userService.findAllCustomers();
    return res.status(status.OK).json(customers);
    } catch (e) {
     return res.status(status.BAD_REQUEST).json({ message: e.message });
   }
};

const findAllSellers = async (_req, res) => {
    try {
    const sellers = await userService.findAllSellers();
    return res.status(status.OK).json(sellers);
    } catch (e) {
     return res.status(status.BAD_REQUEST).json({ message: e.message });
   }
};

const deleteUser = async (req, res) => {
    const { id } = req.params;
    const user = await userService.deleteUser(id);
    return res.status(status.OK).json({ message: `usuario de id ${user} excluido com sucesso` });
};

const findSellers = async (req, res) => {
    const { id } = req.params;
    const sellers = await userService.findSellers(id);
    if (!sellers) {
    return res.status(status.BAD_REQUEST).json({ message: `vendedor de id ${id} não encontrado` });
    }
    return res.status(status.OK).json(sellers); 
};

module.exports = { findAllUsers, findAllCustomers, deleteUser, findSellers, findAllSellers };