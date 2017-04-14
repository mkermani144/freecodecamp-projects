const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const connectToDatabase = async (mongoose) => {
  try {
    await mongoose.connect(process.env.MONGODBURI);
    console.log('Successfully connected to database');
    return 0;
  } catch (e) {
    console.log('Failed to connect to database: ', e);
    return 1;
  }
}

module.exports = connectToDatabase;
