const express = require('express');
const app = express();
const manipulateString = require('./stringManipulator');

app.get('/:string', (req, res) => {
  res.send(manipulateString(req.params.string));
});

app.listen(8000, () => console.log('App is running on http://localhost:8000'));
