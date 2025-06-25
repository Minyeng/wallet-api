const User = require('../models/User');

const userRepository = {
  async findByUsername(username) {
    return User.query().where('username', username).first();
  },

  async create(data) {
    return User.query().insert(data);
  },

};

module.exports = userRepository;
