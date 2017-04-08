const express = require('express');
const Google = require('google-images');
const dotenv = require('dotenv');
const extract = require('./src/extract');

dotenv.config();
const app = express();
const client = new Google(process.env.CSE_ID, process.env.API_KEY);

app.get('/api/imagesearch/:query', (req, res) => {
  client.search(req.params.query)
    .then(images => res.send(extract(images)));
});

app.listen((process.env.PORT || 8000), () => {
  console.log(`App is running on http://localhost:${process.env.PORT || 8000}`);
});
