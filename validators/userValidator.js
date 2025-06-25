const Joi = require('joi');
const { userRepository } = require('../repositories');

const registerSchema = Joi.object({
  username: Joi.string().min(6).required(),
  password: Joi.string().pattern(/^(?=.*[A-Z])(?=.*\d).{8,}$/)
    .messages({
      'string.pattern.base': 'Password must contain at least one uppercase letter and one number, and be at least 8 characters.'
    }),
}).external(async (value) => {
  const exists = await userRepository.findByUsername(value.username);
  if (exists) {
    const error = new Error('Username already exists');
    error.details = [{ message: 'Username already exists', path: ['username'] }];
    throw error;
  }
});

module.exports = { registerSchema };
