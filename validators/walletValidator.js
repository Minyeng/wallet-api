const Joi = require('joi');
const { walletRepository } = require('../repositories');

const increaseSaldoSchema = Joi.object({
  amount: Joi.number().precision(2).required(),
  user_id: Joi.number()
}).external(async (value) => {
  console.log(value);
  const wallet = await walletRepository.findByUserId(value.user_id);
  if (wallet) {
    if (wallet.saldo + value.amount < 0) {
      const error = new Error('Your balance is not enough');
      error.details = [{ message: 'Your balance is not enough', path: ['amount'] }];
      throw error;
    }
  } else {
    const error = new Error('User does not exists');
    error.details = [{ message: 'User does not exists', path: ['user_id'] }];
    throw error;
  }
});

module.exports = { increaseSaldoSchema };
