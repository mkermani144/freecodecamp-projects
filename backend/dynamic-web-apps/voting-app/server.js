const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');

const db = require('./src/database');
const signup = require('./routes/signup');
const login = require('./routes/login');
const logout = require('./routes/logout');
const api = require('./routes/api');
const poll = require('./routes/poll');
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

app.use('/signup', signup);
app.use('/login', login);
app.use('/logout', logout);
app.use('/api', api);
app.use('/poll', poll);

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`App is running on http://localhost:${port}`));
