const express = require('express');
const path = require('path');

const app = express();

app.get('/', (req, res) => {
  res.sendFile(path.resolve('public/index.html'));
});

app.listen(process.env.PORT || 8000, () => {
  console.log(`App is running on http://localhost:${process.env.PORT || 8000}`);
});
