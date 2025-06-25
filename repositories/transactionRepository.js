const Transaction = require('../models/Transaction');

const transactionRepository = {
  async findByUserId(user_id) {
    return Transaction.query().where('user_id', user_id).first();
  },

  async create(data) {
    return Transaction.query().insert(data);
  },

};

module.exports = transactionRepository;
