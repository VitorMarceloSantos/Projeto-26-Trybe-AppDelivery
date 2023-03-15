const { User } = require('../database/models');
const { encryption } = require('../utils/encryptionMD5');
const { generateToken } = require('../jwt/generateToken');

const createUser = async (user) => {
  const { name, email, password: passwordInMd5 } = user; // renomeando a variavel password
  const password = encryption(passwordInMd5); // criptografia do password
  const result = await User.create({ name, email, password });
  const token = generateToken(result.dataValues); // gerando token -> o token vai ser gerado apenas na pagina de register, pois o usuário irá ter acesso de imediato ao sistema
  return { status: 201, message: { user: result.dataValues }, token };
};

const registerNewUser = async (newUser) => {
  const { name, email, password: passwordInMd5, role } = newUser;
  const password = encryption(passwordInMd5);
  await User.create({ name, email, password, role });
  // o token não vai ser gerado nessa pagina, pois o usário está apenas sendo cadastrado
  return { status: 201, message: 'Created' };
};

module.exports = {
  createUser,
  registerNewUser,
};