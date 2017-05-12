const mongoose = require('mongoose');
const dotenv = require('dotenv');
const hashPassword = require('./hashPassword');

dotenv.config();

mongoose.Promise = global.Promise;
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGODBURI);
    console.log('Successfully connected to database');
    return 0;
  } catch (e) {
    console.log(e, 'Failed to connect to database: ', e);
    return 1;
  }
};

const add = async (model, username, password) => {
  try {
    const isDuplicate = Boolean(await model.findOne({ username }));
    if (isDuplicate) {
      throw 'username already exists';
    }
    password = await hashPassword(password);
    await model.create({ username, password, polls: [] });
    console.log('Successfully created document');
    return 0;
  } catch (e) {
    console.log(e, 'Failed to create document');
    return e === 'username already exists' ? 2 : 1;
  }
};

const remove = async (model, username) => {
  try {
    await model.remove({ username });
    console.log('Successfully removed document');
    return 0;
  } catch (e) {
    console.log(e, 'Failed to remove document');
    return 1;
  }
};

const findUser = async (model, username) => {
  try {
    const isTaken = Boolean(await model.findOne({ username }));
    return +isTaken;
  } catch (e) {
    return 2;
  }
};

const addPoll = async (model, username, poll) => {
  try {
    const { title, description, choices } = poll;
    await model.findOneAndUpdate(
      { username: username },
      {
        $push: {
          polls: {
            title,
            description,
            choices
          },
        },
      },
      { safe: true }
    );
    console.log('Successfully added poll');
    return 0;
  } catch (e) {
    console.log(e, 'Failed to add poll');
    return 1;
  }
};

const fetchUserPolls = async (model, username) => {
  try {
    return (await model.findOne({
      username,
    })).polls;
  } catch (e) {
    console.log(e, 'Failed to fetch user polls');
    return 1;
  }
}

module.exports = { connect, add, remove, findUser, addPoll, fetchUserPolls };
