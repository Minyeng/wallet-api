const BaseModel = require('./BaseModel');

class Wallet extends BaseModel {
  static get tableName() {
    return 'wallets';
  }
}

module.exports = Wallet;
