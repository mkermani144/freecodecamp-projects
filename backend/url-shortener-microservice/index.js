const mongoose = require('mongoose');
const express = require('express');
const validate = require('./src/validate');
const makeRandomHex = require('./src/makeRandomHex');
const manipulateDatabase = require('./src/manipulateDatabase');

require('dotenv').config();

const mongoURI = `mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_URI}`;
mongoose.connect(mongoURI);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('app connected to database successfully');
  const URLSchema = mongoose.Schema({
    originalURL: String,
    shortURL: String,
  });
  const URL = mongoose.model('URL', URLSchema);

  const app = express();

  app.get('/new/:string(*)', (req, res) => {
    const isValidURL = validate(req.params.string);
    if(isValidURL) {
      const randomHEX = makeRandomHex();
      manipulateDatabase.add(URL, req.params.string, randomHEX);
      res.send({
        original_url: req.params.string,
        short_url: `https://mkermani144fccp-usm.herokuapp.com/${randomHEX}`,
      });
    } else {
      res.send({
        error: 'Not a valid URL.'
      });
    }
  });

  app.listen(process.env.PORT || 8000, () => {
    console.log(`App is running on http://localhost:${process.env.PORT || 8000}`)
  });
});
