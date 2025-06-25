const Wallet = require('../models/Wallet');

const walletRepository = {
  async findByUserId(user_id) {
    return Wallet.query().where('user_id', user_id).first();
  },

  async create(data) {
    return Wallet.query().insert(data);
  },

  async increaseSaldoByUserId(user_id, amount) {
    return Wallet.query().where('user_id', user_id).first().increment('saldo', amount);
  }

};

module.exports = walletRepository;
