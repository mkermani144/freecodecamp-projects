const express = require('express');
const path = require('path');
const manipulateString = require('./stringManipulator');

const app = express();

app.get('/', (req, res) => {
  res.sendFile(path.resolve('public/index.html'));
});

app.get('/:string', (req, res) => {
  res.send(manipulateString(req.params.string));
});

app.listen(process.env.PORT || 8000, () => console.log('App is running on http://localhost:8000'));
