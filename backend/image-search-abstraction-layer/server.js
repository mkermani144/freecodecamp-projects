const express = require('express');
const Google = require('google-images');
const dotenv = require('dotenv');
var path = require('path');
const extract = require('./src/extract');

dotenv.config();
const app = express();
const client = new Google(process.env.CSE_ID, process.env.API_KEY);

const recent = Array(5).fill({});

app.get('/api/imagesearch/:query', (req, res) => {
  client.search(req.params.query, { page: req.query.offset || 1 })
    .then(images => res.send(extract(images)));
  recent.unshift({
    query: req.params.query,
    when: (new Date()).toISOString(),
  });
  recent.pop();
});

app.get('/api/recent/imagesearch', (req, res) => {
  res.send(recent);
});

app.get('/', (req, res) => {
  res.sendFile(path.resolve('public/index.html'));
});

app.listen((process.env.PORT || 8000), () => {
  console.log(`App is running on http://localhost:${process.env.PORT || 8000}`);
});
