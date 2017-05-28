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
    const { title, description, choices, id } = poll;
    await model.findOneAndUpdate(
      { username: username },
      {
        $push: {
          polls: {
            title,
            description,
            choices,
            id: id | 0,
            time: Date.now(),
            casters: [username],
            owner: username,
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

const removePoll = async (model, username, pollId) => {
  try {
    await model.findOneAndUpdate(
      { username },
      {
        $pull: {
          polls: {
            id: +pollId,
          },
        },
      },
      { safe: true }
    );
    console.log('Successfully removed poll');
    return 0;
  } catch (e) {
    console.log(e, 'Failed to remove poll');
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

const vote = async (model, pollId, choice, caster) => {
  try {
    await model.findOneAndUpdate({
      'polls.id': +pollId,
    }, {
      $inc: { [`polls.$.choices.${choice}`]: 1 },
      $push: { [`polls.$.casters`]: caster }
    });
    return 0;
  } catch (e) {
    console.log(e, 'Failed to vote');
    return 1;
  }
}

const fetchRecentPolls = async (model) => {
  try {
    const result = await model.find().select('polls -_id').sort('-created_at');
    const polls = result.reduce((acc, cur) => {
      return acc.concat(cur.polls);
    }, []);
    return polls.sort((a, b) => b.time - a.time);
  } catch (e) {r
    console.log(e, 'Failed to fetch recent polls');
    return 1;
  }
};

const addChoice = async (model, username, pollId, choices) => {
  try {
    const choicesObject = choices.split(',').reduce((acc, cur) => {
      acc[`polls.$.choices.${cur}`] = 0;
      return acc;
    }, {});
    await model.findOneAndUpdate({
      username,
      [`polls.id`]: pollId,
    }, { $set: choicesObject });
    return 0;
  } catch (e) {
    console.log(e, 'Failed to add new choices');
    return 1;
  }
};

const fetchBlacklist = async (model, pollId) => {
  try {
    const result = await model.findOne({
      [`polls.id`]: +pollId,
    }).select('polls.$.casters -_id');
    return result.polls[0].casters;
  } catch (e) {
    console.log(e, 'Failed to add new choices');
    return 1;
  }
}

module.exports = {
  connect,
  add,
  remove,
  findUser,
  addPoll,
  removePoll,
  fetchUserPolls,
  vote,
  fetchRecentPolls,
  addChoice,
  fetchBlacklist,
};
