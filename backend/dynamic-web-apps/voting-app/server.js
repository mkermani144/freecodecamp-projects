const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');

const User = require('./models/User');
const db = require('./src/database');
require('./config/passport');

db.connect();

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());

app.post('/api/finduser', async (req, res) => {
  const result = await db.findUser(User, req.body.username);
  res.json({ userExists: result !== 0 });
});

app.post('/signup', async (req, res) => {
  const result = await db.add(User, req.body.username, req.body.password);
  if (result === 0) {
    passport.authenticate('local', (err, user, info) => {
      if (err) {
        return res.status(500).end();
      }
      req.logIn(user, (err) => {
        if (err) {
          return res.status(500).end();
        }
        res.status(200).end();
      });
    })(req, res);
  } else {
    res.status(500).end();
  }
});

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`App is running on http://localhost:${port}`));
