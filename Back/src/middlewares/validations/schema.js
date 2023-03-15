const Joi = require('joi');

const MIN_NAME = 12;
const MIN_PASSWORD = 6;
const nameSchema = Joi.string().min(MIN_NAME);
const emailSchema = Joi.string().pattern(/^\S+@\S+\.\S+$/).required();
const passwordSchema = Joi.string().min(MIN_PASSWORD).required();
const roleSchema = Joi.string().valid('administrator', 'customer', 'seller').required();

const schemaVerify = Joi.object({
  email: emailSchema,
  password: passwordSchema,
});

const schemaUser = Joi.object({
  name: nameSchema,
  email: emailSchema,
  password: passwordSchema,
});

const schemaNewUser = Joi.object({
  name: nameSchema,
  email: emailSchema,
  password: passwordSchema,
  role: roleSchema,
});

module.exports = { schemaVerify, schemaUser, schemaNewUser };