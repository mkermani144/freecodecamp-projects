const express = require('express');
const validate = require('./src/validate');
const makeRandomHex = require('./src/makeRandomHex');

const app = express();

app.get('/new/:string(*)', (req, res) => {
  const isValidURL = validate(req.params.string);
  if(isValidURL) {
    const randomHEX = makeRandomHex();
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
