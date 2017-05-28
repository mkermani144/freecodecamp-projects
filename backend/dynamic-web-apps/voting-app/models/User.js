const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = mongoose.Schema({
  username: String,
  password: String,
  polls: Array,
});
UserSchema.methods.correctPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
}

const User = mongoose.model('User', UserSchema);

module.exports = User;
