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
  console.log('App connected to database successfully');
  const URLSchema = mongoose.Schema({
    originalURL: String,
    shortURL: String,
  });
  const URL = mongoose.model('URL', URLSchema);

  const app = express();

  app.get('/new/:string(*)', (req, res) => {
    const isValidURL = validate(req.params.string);
    if(isValidURL) {
      manipulateDatabase.fetchShortURLs(URL, (blacklist) => {
        const randomHEX = makeRandomHex(blacklist);
        manipulateDatabase.add(URL, req.params.string, randomHEX);
        res.send({
          original_url: req.params.string,
          short_url: `https://mkermani144fccp-usm.herokuapp.com/${randomHEX}`,
        });
      });
    } else {
      res.send({
        error: 'The URL is not valid.'
      });
    }
  });

  app.get('/:shortURL', (req, res) => {
    manipulateDatabase.findOriginalURL(URL, req.params.shortURL, (data) => {
      if (data.length) {
        res.redirect(data[0].originalURL);
      } else {
        res.send({ error: 'The URL does not exist on the database.'});
      }
    });
  });

  app.listen(process.env.PORT || 8000, () => {
    console.log(`App is running on http://localhost:${process.env.PORT || 8000}`)
  });
});
