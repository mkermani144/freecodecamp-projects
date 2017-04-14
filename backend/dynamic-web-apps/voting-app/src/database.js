const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

mongoose.Promise = global.Promise;
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGODBURI);
    console.log('Successfully connected to database');
    return 0;
  } catch (e) {
    console.log('Failed to connect to database: ', e);
    return 1;
  }
}

const add = async (model, username, password) => {
  try {
    const isDuplicate = Boolean(await model.findOne({ username }));
    if (isDuplicate) {
      throw 'username already exists';
    }
    await model.create({ username, password });
    console.log('Successfully created document');
    return 0;
  } catch (e) {
    console.log('Failed to create document');
    return e === 'username already exists' ? 2 : 1;
  }
}

const remove = async (model, username) => {
  try {
    await model.remove({ username });
    console.log('Successfully removed document');
    return 0;
  } catch (e) {
    console.log('Failed to remove document');
    return 1;
  }
}

module.exports = { connect, add, remove };
