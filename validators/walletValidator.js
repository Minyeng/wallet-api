const Joi = require('joi');

const increaseSaldoSchema = Joi.object({
  amount: Joi.number().precision(2).positive().required(),
});

module.exports = { increaseSaldoSchema };
