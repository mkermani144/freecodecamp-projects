const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const User = require('./models/User');

const db = require('./src/database');

db.connect();

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post('/api/finduser', async (req, res) => {
  const result = await db.findUser(User, req.body.username);
  res.json({ userExists: result !== 0 });
});

app.post('/signup', async (req, res) => {
  const result = await db.add(User, req.body.username, req.body.password);
  if (result === 0) {
    res.status(200).end();
  } else {
    res.status(500);
  }
});

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`App is running on http://localhost:${port}`));
