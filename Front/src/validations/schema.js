const Joi = require('joi');

const MIN_NAME = 12;
const MIN_PASSWORD = 6;
const nameSchema = Joi.string().min(MIN_NAME);
const emailSchema = Joi.string().pattern(/^\S+@\S+\.\S+$/).required();
const passwordSchema = Joi.string().min(MIN_PASSWORD).required();

const schemaVerify = Joi.object({
  email: emailSchema,
  password: passwordSchema,
});

const schemaUser = Joi.object({
  name: nameSchema,
  email: emailSchema,
  password: passwordSchema,
});

module.exports = { schemaVerify, schemaUser };
