const BaseModel = require('./BaseModel');

class Transaction extends BaseModel {
  static get tableName() {
    return 'transactions';
  }
}

module.exports = Transaction;
