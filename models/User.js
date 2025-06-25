const BaseModel = require('./BaseModel');

class User extends BaseModel {
  static get tableName() {
    return 'users';
  }

  static get relationMappings() {
    const Wallet = require('./Wallet');

    return {
      wallet: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: Wallet,
        join: {
          from: 'users.id',
          to: 'wallets.user_id'
        }
      }
    };
  }
}

module.exports = User;
