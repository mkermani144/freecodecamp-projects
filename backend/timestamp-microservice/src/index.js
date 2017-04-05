const express = require('express');
const app = express();
const manipulateString = require('./stringManipulator');

app.get('/:unix(\\d+)', (req, res) => {
  res.send(manipulateString(req.params.unix));
});

app.listen(8000);
