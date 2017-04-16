const db = require('../src/database');
const UserModel = require('../models/User.js');

class User {
  static async userExists({ username }) {
    const result = await db.findUser(UserModel, username);
    return result;
  }
}

class Database {
  static user() {
    return User;
  }
}

const root = {
  database: () => Database,
};

module.exports = root;
