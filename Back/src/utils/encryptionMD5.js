const md5 = require('md5');

const encryption = (password) => {
  const passwordInMd5 = md5(password);
  return passwordInMd5;
};
  
  module.exports = {
    encryption,
};