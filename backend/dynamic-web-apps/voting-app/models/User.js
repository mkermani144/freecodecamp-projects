const mongoose = require('mongoose');

const UserSchema = mongoose.schema({
  username: String,
  password: String,
});
const User = mongoose.model('User', UserSchema);

module.exports = User;
